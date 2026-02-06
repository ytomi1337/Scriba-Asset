const taskService = require('../services/task-service')

module.exports = {
    async getUserTask(req,res){
        try{
            const tasks = await taskService.getUserTask(req.user.id)
            return res.json(tasks)  
        }catch (err) {
            console.error('Get /tasks: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async create (req,res){
        try{
            const task = await taskService.create(req.user.id, req.body);
            return res.status(201).json(task);
        }catch (err) {
            console.error('POST /tasks: ', err);
            return res.status(500).json({error: 'internal_server_error'})
        }
    },
    async decide(req, res) {
    try {
      const { id, decision } = req.params;
      const result = await taskService.decide(req.user.id, id, decision);
      return res.json(result);
    } catch (err) {
      console.error('PATCH /tasks/:id/decision:', err);
      return res.status(500).json({ error: 'internal_server_error' });
    }
  }
}