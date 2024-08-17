const express = require('express');
const router = express.Router();

const Person = require('../models/person');
const { json } = require('body-parser');

//POST route to add as person
router.post('/', async (req, res) => {
    try {
    const newPersonData = req.body;//Assuming the request body contain the person data
  
    //create a new person documnet using the mongoose  model
    const newPerson = new Person(newPersonData);
  
    // Save the new person to the database using await
    const savedPerson = await newPerson.save();
    console.log('Saved person to database');
    res.status(201).json(savedPerson);
    } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  //get route to find the person data
  router.get('/', async(req,res) =>{
    try{
      const data = await Person.find();
      console.log('data fetched');
      res.status(201).json(data);
  
    }catch(error){
  
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/:workType', async(req, res) => {
    try {
      const workType = req.params.workType //Extract the worktype from the URL parameter
      if(workType == 'chef' || workType == 'manager' || workType =='waiter' ){
        const response = await Person.find({work: workType});
        console.log("response fethched");
        res.status(201).json(response);

      }else{
        res.status(404).json({error:"inavlid work type"});
      }
      
    } catch(error) {
      console.log(error);
      res.status(500).json({error: "internal server error"})
      
    }

});

//update the Person Data
router.put('/:id', async (req, res) => {
    try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter 
    
    const updatedPersonData = req.body; // Updated data for the person
   
    // Assuming you have a Person model
    const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
    new: true, // Return the updated document
    runValidators: true, // Run Mongoose validation
 });
 
 if (!updatedPerson) {
 return res.status(404).json({ error: 'Person not found'});
 }
 // Send the updated person data as a JSON response
 console.log("data updated");
 res.status(200).json(updatedPerson);
  } catch (error) {
  console.error('Error updating person:', error);
  res.status(500).json({ error: 'Internal server error' });
 }
});

//delete the Person Data
router.delete('/:id', async(req, res)=>{
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter 
        //Assuming person model
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: "Person not Found"});
        }
        console.log("Data Delete");
        res.status(200).json({message:"Person deleted succesfully"})
    
    } catch (error) {
        console.error('Error Deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
})
    

module.exports = router;
