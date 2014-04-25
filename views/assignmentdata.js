db.assignmentcollection.remove({});

db.assignmentcollection.insert({'phase': 'phase1', 'sprint': 'sprint1',
{'question': 'item1'},
{'question': 'item2'},
{'question': 'item3'},
{'question': 'item4'}
});


db.assignmentcollection.find().pretty();