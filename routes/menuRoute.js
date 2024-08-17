const express = require('express');
const router = express.Router();

const MenuItem = require('../models/menuItem');



//POST route to add as Menu
router.post('/', async(req , res) => {
    try {
      const data = req.body;//Assuming the request body contain the Menu data
    
      //create a new Menu documnet using the mongoose  model
      const newMenuItem = new MenuItem(data);
    
      // Save the new menu to the database using await
      const response = await newMenuItem.save();
      console.log('data saved');
      res.status(201).json(response);
      } catch (error) {
      console.error('Error saving Menu:', error);
      res.status(500).json({ error: 'Internal server error' });
      }
    });
  
//get route to find the Menu data
router.get('/', async(req,res) =>{
      try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(201).json(data);
    
      }catch(error){
    
        console.error('Error saving menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:taste', async(req,res) =>{
    try{
      const taste = req.params.taste;
      if(taste =='Sweet' || taste =='Spicy' || taste =='Sour'){
        const response = await MenuItem.find({taste: taste});
        console.log("response fethched");
        res.status(201).json(response);

      }else{
        res.status(404).json({error:"inavlid work type"});
      
     }
    
    }catch(error){
  
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//update the Menu Data
router.put('/:id', async (req, res) => {
    try {
    const menuId = req.params.id; // Extract the menu ID from the URL parameter 
    
    const updateMenu = req.body; // Updated data for the Menu
   
    // Assuming you have a Menu Model
    const response = await MenuItem.findByIdAndUpdate(menuId, updateMenu, {
    new: true, // Return the updated document
    runValidators: true, // Run Mongoose validation
 });
 
 if (!response) {
 return res.status(404).json({ error: 'menu not found'});
 }
 // Send the updated person data as a JSON response
 console.log("menu updated");
 res.status(200).json(response);
  } catch (error) {
  console.error('Error updating person:', error);
  res.status(500).json({ error: 'Internal server error' });
 }
});

//delete the Menu Data
router.delete('/:id', async(req, res)=>{
    try {
        const menuId = req.params.id; // Extract the person's ID from the URL parameter 
        //Assuming person model
        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response){
            return res.status(404).json({error: "Menu not Found"});
        }
        console.log("Data Delete");
        res.status(200).json({message:"Menu deleted succesfully"})
    
    } catch (error) {
        console.error('Error Deleting Menu:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
})

module.exports = router;
