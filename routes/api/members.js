/**
 * Created by Hitesh on 08-Aug-19.
 */
const express=require('express');
const router=express.Router();
const uuid=require('uuid');
const members=require('../../Members');

router.get('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found = members.some(member => member.id===parseInt(req.params.id));

if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
}else{
    res.status(400).json({msg:'member not found'});
}
});
router.post('/',(req,res)=>{
    //res.json(members);
    const newMember={
        id:uuid.v4(),
        name: req.body.name,
    }

    if(!newMember.name){
         return res.status(400).json({msg:'Please include'});
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});


router.get('/',(req,res)=>{
    res.json(members);
});

//Update
router.put('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found = members.some(member => member.id===parseInt(req.params.id));

if(found) {
    const updMember=req.body;
    members.forEach(member=>{
        if(member.id==parseInt(req.params.id)){
           member.name=req.body.name;

           //es.json({msg:'member Updated'});
            res.json(members);

    }
    });
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
}else{
    res.status(400).json({msg:'member not found'});
}
});

//delete

router.delete('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found = members.some(member => member.id===parseInt(req.params.id));

if(found) {
    res.json({msg:'member deleted',members: members.filter(member => member.id !== parseInt(req.params.id))
});
}else{
    res.status(400).json({msg:'member not found'});
}
});


module.exports=router;