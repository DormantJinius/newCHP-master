db.assignmentcollection.remove({});

db.assignmentcollection.insert({
   'phase': 'phase1', 
   'sprint': 'sprint1',
   'gradelist': [

   ],
   'questionlist': [
       {'question': 'Why?'},
       {'question': 'When?'}
   ],
   'answerlist': [
       {'answer': 'Because'},
       {'answer': 'Later'}
   ],
   'tasklist': [
       {'task': 'Introduction to HTML5'},
       {'task': 'Tasks: creating HTML5 Web pages with HTML5 techonologies'},
       {'task': 'Overview of HTML5 techonologies'},
       {'task': 'CSS3'},
       {'task': 'SVG'}
   ]
});

db.assignmentcollection.insert({
   'phase': 'phase1', 
   'sprint': 'sprint2',
   'gradelist': [
   	   {'billsGrade': 92},
       {'josesGrade': 95},
       {'petersGrade': 99},
       {'seansGrade': 84},
       {'taylorsGrade': 89}
   ],
   'questionlist': [
       {'question': 'item1'},
       {'question': 'item2'},
       {'question': 'item3'},
       {'question': 'item4'}
   ],
   'answerlist': [
       {'answer': 'item1'},
       {'answer': 'item2'},
       {'answer': 'item3'},
       {'answer': 'item4'}
   ],
   'tasklist': [
       {'task': 'Introduction to HTML5'},
       {'task': 'Tasks: creating HTML5 Web pages with HTML5 techonologies'},
       {'task': 'Overview of HTML5 techonologies'},
       {'task': 'CSS3'},
       {'task': 'SVG'}
   ]
});

db.assignmentcollection.insert({
   'phase': 'phase2', 
   'sprint': 'sprint1',
   'gradelist': [
       {'billsGrade': 92},
       {'josesGrade': 95},
       {'petersGrade': 99},
       {'seansGrade': 84},
       {'taylorsGrade': 89}
   ],
   'questionlist': [
       {'question': 'item1'},
       {'question': 'item2'},
       {'question': 'item3'},
       {'question': 'item4'},
       {'question': 'item5'}

   ],
   'answerlist': [
       {'answer': 'item1'},
       {'answer': 'item2'},
       {'answer': 'item3'},
       {'answer': 'item4'},
       {'answer': 'item5'}
   ],
   'tasklist': [
       {'task': 'item1'},
       {'task': 'item2'},
       {'task': 'item3'},
       {'task': 'item4'},
       {'task': 'item5'}
   ]
});

db.assignmentcollection.insert({
   'phase': 'phase2', 
   'sprint': 'sprint2',
   'gradelist': [
       {'billsGrade': 45},
       {'josesGrade': 85},
       {'petersGrade': 97},
       {'seansGrade': 86},
       {'taylorsGrade': 87}
   ],
   'questionlist': [],
   'answerlist': [],
   'tasklist': [
       {'task': 'Introduction to HTML5'},
       {'task': 'Tasks: creating HTML5 Web pages with HTML5 techonologies'},
       {'task': 'Overview of HTML5 techonologies'},
       {'task': 'CSS3'},
       {'task': 'SVG'}
   ]
});
db.assignmentcollection.find().pretty();

