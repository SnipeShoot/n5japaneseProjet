'use strict';


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient,Card,quick_replies,RichResponse,Suggestion} = require('dialogflow-fulfillment');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  
  
 
  //***************verbs Group***********************
  
  function verbDB (agent) {
        
         const Entry = agent.parameters.verbtypes;
      const array=[];        
        const query1 = db.collection('verb').where("group","==",Entry).limit(10);  
       // const query2 = db.collection('verb').where("group","==",Entry);   
     return query1.get()                  
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                   
                         array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                        
                      });           
                      agent.add(array.join('\n \n'));  
                      agent.add(new Suggestion(`View All G${Entry}`));
                      agent.add(new Suggestion(`Later`));
					  
					   }).catch(() => {
                    agent.add('Error reading entry from the Firestore database.');
					});   
	  
  }
  
  
   //************************noun groups ************************
  
   function nounDB (agent) {
        
         const Entry = agent.parameters.nounTypes;     
         
         const array=[];
        const query = db.collection('noun').where("n","==",Entry.toLowerCase()).limit(10);
       
        
     return query.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                      
                        
                         array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji); 
                         
                   });
              
                agent.add(array.join('\n \n')); 
                agent.add(new Suggestion(`ViewAll${Entry}`));
                agent.add(new Suggestion(`Later`));
         }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
       
      });
      }
  
  
   //***************adjective Group***********************
  
  function adjDB (agent) {
         const Entry = agent.parameters.adjectiveTypes;   
         const array=[];
        const query1 = db.collection('adjective').where("adj","==",Entry.toLowerCase()).limit(10);        
        return query1.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                      
                        
                          array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                       
                   });
                agent.add(array.join('\n \n')); 
                agent.add(new Suggestion(`ViewAll${Entry}`));
               agent.add(new Suggestion(`Later`));
        }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');     
        });
  }
   
   //******************************************************

   //***************************adverb***************************
  function adverbDB (agent) {
        
         const Entry = agent.parameters.adv;     
         
         const array=[];
        const query = db.collection('adverb').where("a","==",Entry.toLowerCase()).limit(10);       
     return query.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                      
                        
                         array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji); 
                         
                   });             
                agent.add(array.join('\n \n'));  
                agent.add(new Suggestion(`ViewAll${Entry}`));
                 agent.add(new Suggestion(`Later`));
         }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
       
      });
      }
  
  //************************family members ************************
  
   function familyDB (agent) {
        
         const Entry = agent.parameters.familyType;     
         
         const array=[];        
        const query= db.collection('familymembers').where("ff","==",Entry);        
     return query.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                         
                         array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji); 
                           });              
                   agent.add(array.join('\n \n'));
                      agent.add(new Suggestion(`Exit!`));
                     })  
                      .catch(() => {
            agent.add('Error reading entry from the Firestore database.');
           });     
      }        
  
    
  //*********************exp of time and period********
  
   function timePeriodbDB(agent) {
        
         const Entry = agent.parameters.ExpressionOFTimeAndPeriodTypes;     
         
         const array1=[];
         const array2=[];
         const array3=[];
         
        const query1 = db.collection('expression').where("ep","==",Entry.toLowerCase());
        const query2 = db.collection('expression').where("et","==",Entry.toLowerCase());
        const query3 = db.collection('numbersanddates').where("c","==",Entry.toLowerCase());
       
        
     return query1.get()
     .then(function(querySnapshot) {       
                    querySnapshot.forEach(function(doc){                  
                              array1.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                         
                   });
                agent.add('Expression of Periods');
                agent.add(array1.join('\n \n'));  
       
                  return query2.get()
                     .then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc){
                                      array2.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji); 
                                   });
                                 agent.add('Expression of Times');
                                 agent.add(array2.join('\n \n'));   
                    
                                        return query3.get()
                                           .then(function(querySnapshot) {
                                            querySnapshot.forEach(function(doc){                
											    array3.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji); 
                                               });
                                         agent.add('additional expressions of time and period');
                                         agent.add(array3.join('\n \n'));  
                                          agent.add(new Suggestion(`Exit!`));
                                        });
       
                          });
        })
       
       .catch(() => {
        agent.add('Error reading entry from the Firestore database.');
       
      }); 
      } 
     
  //**********************
  //************************counter Suffix ************************
  
   function CsDB (agent) {        
         const Entry = agent.parameters.counterSuffix;           
         const array=[];
        const query = db.collection('countersuffixes').where("cs","==",Entry.toLowerCase());   
        
     return query.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){            
                      array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                          
                   });
                agent.add(array.join('\n \n')); 
              agent.add(new Suggestion(`Exit!`));
         }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
       
      });
     }
      
  
  //**********************************************
  
//******************************counting Number**************
  
  function NumDB (agent) {
        
         const Entry = agent.parameters.countingNumber;     
         
         const array=[];
        const query = db.collection('numbersanddates').where("cn","==",Entry.toLowerCase()).limit(10);      
     return query.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                        
                         array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                       
                   });
              
                agent.add(array.join('\n \n'));
                agent.add(new Suggestion(`ViewAll${Entry}`));
                 agent.add(new Suggestion(`Exit!`));
         }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
       
      });
      }
 
  //******************************Kanji**************************
   function kanjiDB (agent) {        
         const Entry = agent.parameters.kanji;       
         const query1 = db.collection('kanji').where("k","==",Entry);      
     return query1.get()
     .then(function(querySnapshot) {
        
      querySnapshot.forEach(function(doc){               
        agent.add(new Card({
        title:'  Kun:  '+ doc.data().kun +'   On: '+ doc.data().on,
        imageUrl:doc.data().image,
        }));       
      });   
          agent.add('slide to view kanjis');
         if(Entry!="k3"){  
                     agent.add(new Suggestion(`show Next${Entry}`));
                     agent.add(new Suggestion(`Exit!`));
                       
                    }else{                     
                       agent.add(`If you know this much you are great enough!`);
                        agent.add(new Suggestion(`Exit!`));                     
                 }
       
         
           }).catch(() => {
             agent.add('Error reading entry from the Firestore database.');       
            });   
   }  

  //*********************************
//******************************tourist**************************
   function TouristDB (agent) {        
         const Entry = agent.parameters.BasicTouristExpressionTypes;   
         const arr=[];
         const query = db.collection('tourist').where("t","==",Entry);      
     return query.get()
     .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc){                   
                          arr.push('\u2055  '+doc.data().japanese +'  \n'+ doc.data().english +'  \n'+doc.data().romaji);                       
                      });   
                       agent.add(arr.join(`\n  \n`));         
                 if((Entry!="g7")&&(Entry!="d12")&&(Entry!="gn7")){  
                     agent.add(new Suggestion(`continue-${Entry}`));
                     agent.add(new Suggestion(`Exit!`));
                       
                    }else{                     
                       agent.add(`If you know this much you are great enough!`);
                        agent.add(new Suggestion(`Exit!`));                     
                 }
           }).catch(() => {
             agent.add('Error reading entry from the Firestore database.');       
            });   
   }  

  //*********************************  
 function ViewAllDB (agent) {
        
        const Entry = agent.parameters.ViewAll;
        const array=[];                 
        const query1 = db.collection('verb').where("group","==",Entry);
        const query2 = db.collection('noun').where("n","==",Entry.toLowerCase());
		const query3 = db.collection('adjective').where("adj","==",Entry.toLowerCase());			
		const query4 = db.collection('numbersanddates').where("cn","==",Entry.toLowerCase());
		const query5 = db.collection('adverb').where("a","==",Entry.toLowerCase());
		
     return query1.get()
     .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){                   
                         array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                        
                      });                     
                    return query2.get()
                    .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc){                   
                          array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                       
                      }); 
                      return query3.get()
                    .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc){                   
                          array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                       
                      });  
					  return query4.get()
                    .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc){                   
                          array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                       
                      });  					 				  
                       return query5.get()
                    .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc){                   
                          array.push('\u2055  '+doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji);                       
                      });  					 				  
                      agent.add(array.join('\n \n'));	
                          agent.add(new Suggestion(`Exit!`));
					}).catch(() => {
                    agent.add('Error reading entry from the Firestore database.');
					});
	             });
			  });
			});
		 });
	
  }
  
   //***********************************meaning/dictionary search***************************
  function meaningfromDB(agent) {
        
    const Entry = agent.parameters.any;
    const query11 = db.collection('verb').where("english","==",Entry.toLowerCase());
    const query12 = db.collection('noun').where("english","==",Entry.toLowerCase());
    const query13 = db.collection('adjective').where("english","==",Entry.toLowerCase()); 
    const query14 = db.collection('adverb').where("english","==",Entry.toLowerCase()); 
    const query15 = db.collection('familymember').where("english","==",Entry.toLowerCase()); 	
    const query16 = db.collection('timeandperiod').where("english","==",Entry.toLowerCase()); 
    const query17 = db.collection('countingnumber').where("english","==",Entry.toLowerCase()); 
	
    const query21 = db.collection('verb').where("japanese","==",Entry);
    const query22 = db.collection('noun').where("japanese","==",Entry);
    const query23 = db.collection('adjective').where("japanese","==",Entry);
	const query24 = db.collection('adverb').where("japanese","==",Entry);
    const query25 = db.collection('familymember').where("japanese","==",Entry);
    const query26 = db.collection('timeandperiod').where("japanese","==",Entry);
	const query27 = db.collection('countingnumber').where("japanese","==",Entry);
        
    const query31 = db.collection('verb').where("romaji","==",Entry.toLowerCase());
    const query32 = db.collection('noun').where("romaji","==",Entry.toLowerCase());
    const query33 = db.collection('adjective').where("romaji","==",Entry.toLowerCase());
	const query34 = db.collection('adverb').where("romaji","==",Entry.toLowerCase());
    const query35 = db.collection('familymember').where("romaji","==",Entry.toLowerCase());
    const query36 = db.collection('timeandperiod').where("romaji","==",Entry.toLowerCase());
	const query37 = db.collection('countingnumber').where("romaji","==",Entry.toLowerCase());
	
  
     return query11.get()
     .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){               
        agent.add(new Card({
        title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
         imageUrl:doc.data().image,
        }));
        agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);                                     
         });
            return query12.get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){                            
            agent.add(new Card({
            title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
             imageUrl:doc.data().image,
            }));
            agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
            });
                return query13.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc){                                            
                agent.add(new Card({
                title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
                imageUrl:doc.data().image,
                }));
                agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2} \n ${doc.data().example3}`);
                });
			        return query14.get()
				    .then(function(querySnapshot) {
					querySnapshot.forEach(function(doc){													
					agent.add(new Card({
					 title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
					 imageUrl:doc.data().image,
					}));
					agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2} \n ${doc.data().example3}`);
					});
						return query15.get()
						.then(function(querySnapshot) {
						querySnapshot.forEach(function(doc){																
					    agent.add(new Card({
						 title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
						 imageUrl:doc.data().image,
						}));														 
						});
						     return query16.get()
							.then(function(querySnapshot) {
							querySnapshot.forEach(function(doc){																				
					   	    agent.add(new Card({
							 title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
							 imageUrl:doc.data().image,
							}));																		 
							});
						    	return query17.get()
							   .then(function(querySnapshot) {
								querySnapshot.forEach(function(doc){																						
							    agent.add(new Card({
								 title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
								 imageUrl:doc.data().image,
								}));																		
								});
						return query21.get()
						       .then(function(querySnapshot) {
								querySnapshot.forEach(function(doc){																									
								agent.add(new Card({
								title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
								 imageUrl:doc.data().image,
								}));
								agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
								});
									return query22.get()
									.then(function(querySnapshot) {
									querySnapshot.forEach(function(doc){																													
									agent.add(new Card({
									title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
									  imageUrl:doc.data().image,
									}));
									agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
									});
										return query23.get()
										.then(function(querySnapshot) {
										querySnapshot.forEach(function(doc){                            
										agent.add(new Card({
										title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
										  imageUrl:doc.data().image,
										}));
										agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2} \n ${doc.data().example3}`);
										});
											return query24.get()
											.then(function(querySnapshot) {
											querySnapshot.forEach(function(doc){                                            
									    	agent.add(new Card({
										    title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
										     imageUrl:doc.data().image,
											}));
											agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2} \n ${doc.data().example3}`);
											});
											    return query25.get()
											   .then(function(querySnapshot) {
												querySnapshot.forEach(function(doc){													
												agent.add(new Card({
												title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
												 imageUrl:doc.data().image,
												}));																								 
												});
													return query26.get()
													.then(function(querySnapshot) {
													querySnapshot.forEach(function(doc){																
												    agent.add(new Card({
												   title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
												     imageUrl:doc.data().image,
												    }));																					 
													});
													    return query27.get()
													    .then(function(querySnapshot) {
													    querySnapshot.forEach(function(doc){																				
														agent.add(new Card({
														title:'Word: '+ doc.data().english +'/ '+ doc.data().japanese +'/'+doc.data().romaji,
														 imageUrl:doc.data().image,
														}));
														});
							 return query31.get()
								.then(function(querySnapshot) {
								querySnapshot.forEach(function(doc){																						
								agent.add(new Card({
								title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
								  imageUrl:doc.data().image,
								}));
								agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
																								 
								});
									return query32.get()
									.then(function(querySnapshot) {
									querySnapshot.forEach(function(doc){																									
									agent.add(new Card({
									title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
									 imageUrl:doc.data().image,
									}));
									agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
									});
									    return query33.get()
									    .then(function(querySnapshot) {
										querySnapshot.forEach(function(doc){																													
										agent.add(new Card({
										title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
										 imageUrl:doc.data().image,
										}));
										agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
										});
											 return query34.get()
											.then(function(querySnapshot) {
											querySnapshot.forEach(function(doc){																						
											 agent.add(new Card({
											title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
										     imageUrl:doc.data().image,
											}));
											agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}\n ${doc.data().example3}`);
											});
												return query35.get()
												.then(function(querySnapshot) {
												querySnapshot.forEach(function(doc){																									
												agent.add(new Card({
												title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
											     imageUrl:doc.data().image,
												}));
											    agent.add(`Example:  \n${doc.data().example1}  \n ${doc.data().example2}`);
												 });
													return query36.get()
													.then(function(querySnapshot) {
													querySnapshot.forEach(function(doc){																													
													agent.add(new Card({
													title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
											    	 imageUrl:doc.data().image,
													}));																		
												    });
														return query37.get()
														.then(function(querySnapshot) {
														querySnapshot.forEach(function(doc){																													
														agent.add(new Card({
														title:'Word: '+ doc.data().japanese +'/ '+ doc.data().english +'/'+doc.data().romaji,
													     imageUrl:doc.data().image,
														}));																				
														});			
					
				                                             })
                                                              .catch(() => {
      														  agent.add('Error reading entry from the Firestore database.');
                                                      
						                           		                                   }); 
							                                                           }); 					
                                                                                    });
								                                                }); 
							                                                });
						                                                });
			                                                    	}); 		 
                          		                                }); 
							                                }); 					
                                                        });
								                    }); 
							                    });
						                    }); 
										}); 
									});
								});
							});
						}); 
				}); 
			});	          
     
      
      }); 
    
     }
 
   //
  

   
   //**************************************************************************
  
  let intentMap = new Map();
       intentMap.set('verbGroup',verbDB);    
       intentMap.set('nounTypes',nounDB);
       intentMap.set('adjectiveTypes',adjDB);
       intentMap.set('adverb',adverbDB);
       intentMap.set('familyMemberTypes',familyDB);
       intentMap.set('ExpressionOfTimeAndPeriodTypes',timePeriodbDB);
       intentMap.set('countingNumber',NumDB);
       intentMap.set('counterSuffixTypes',CsDB);
       intentMap.set('kanjiTypes',kanjiDB);
       intentMap.set('TouristExpressionTypes',TouristDB);
       intentMap.set('ViewAll',ViewAllDB);    
     
      intentMap.set('DictionarySearchcustom',meaningfromDB);
     agent.handleRequest(intentMap);
});