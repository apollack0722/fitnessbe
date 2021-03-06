const client = require("./client");

async function getRoutineActivityById({id}) {
    try {
       const { rows: [routineActivity] } = await client.query(`
            SELECT * FROM routine_activities
            WHERE id=$1;
       `, [id]);
       return routineActivity;
    } catch (error) {
        throw error
    }
}8
async function addActivityToRoutine({ routineId, activityId, count, duration }){
    try {
       const {rows: [routine_activity]} = await client.query(`
            INSERT INTO routine_activities("routineId", "activityId", count, duration)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
       `, [routineId, activityId, count, duration]);
        return routine_activity;
    } catch (error) {
        throw error
    }
}
async function updateRoutineActivity({ id, count, duration }){
    try {
        const {rows: [routine_activities]} = await client.query(`
            UPDATE routine_activities
            SET count=$2, duration=$3
            WHERE id=$1
            RETURNING *;
            `, [id, count, duration]);
        if (count) routine_activities.count = count;
        if (duration) routine_activities.duration = duration;
        return routine_activities;
    } catch (error) {
        throw error; 
    }
  }
  
async function destroyRoutineActivity(id) {
    try {
        const { rows: [deleted] } = await client.query(`
            DELETE FROM routine_activities
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return deleted;
    } catch (error) {
      throw error;
    }
}

async function getRoutineActivitiesByRoutine({ id }) {
    try {
        const { rows } = await client.query(`
            SELECT * FROM routine_activities
            WHERE "routineId"=$1;
        `, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
}