import { getConnection } from "./../database/database";

/*
 * Retrieves an action plan from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {object} - The retrieved action plan as a JSON response.
 *
 * Autor Steven Naranjo Mora
 * Fecha creacion 07/04/2023
 */
const getActionsPlans = async (req, res) => {
  try {
    // Establish a database connection
    const connection = await getConnection();

    // Call the stored procedure 'sp_get_actionplans' to get action plans from the database
    const result = await connection.query("CALL sp_get_actionplans();");

    // Send the retrieved data as a JSON response to the client

    //res.header('Access-Control-Allow-Origin');

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.json(result);
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

/*
 * Retrieves an action plan by its ID from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {object} - The retrieved action plan as a JSON response.
 *
 * Autor Steven Naranjo Mora
 * Fecha creacion 07/04/2023
 */
const getActionPlanByID = async (req, res) => {
  try {
    // Extract the 'id' parameter from the request
    const { id } = req.params;

    // Establish a database connection
    const connection = await getConnection();

    // Call the stored procedure 'sp_get_actionplan_by_id' to get an action plan by its ID from the database
    const result = await connection.query(
      `CALL sp_get_actionplan_by_id( ${id});`
    );

    // Send the retrieved data as a JSON response to the client
    res.header("Access-Control-Allow-Origin");
    res.json(result);
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

const getActionPlanDetailsByID = async (req, res) => {
  try {
    // Extract the 'id' parameter from the request
    const { id } = req.params;

    // Establish a database connection
    const connection = await getConnection();

    // Call the stored procedure 'sp_get_actionplan_by_id' to get an action plan by its ID from the database
    const result = await connection.query(
      `CALL get_action_plan_details( ${id});`
    );

    // Send the retrieved data as a JSON response to the client
    const jsonOutput = result[0][0].json_output;
    res.header("Access-Control-Allow-Origin");
    res.send(jsonOutput);
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

/*
 * Adds a new action plan to the database.
 *
 * @param {object} req - The HTTP request object containing a JSON representation of the action plan.
 * @param {object} res - The HTTP response object.
 * @returns {object} - A success message as a JSON response.
 *
 * Autor Steven Naranjo Mora
 * Fecha creacion 07/04/2023
 *
 */
const addActionPlan = async (req, res) => {
  try {
    // Extract the JSON input from the request body
    const input_json = req.body;
    // Check if the input is undefined, and send a 400 Bad Request response if it is
    if (input_json === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    // Establish a database connection
    const connection = await getConnection();
    // Call the stored procedure 'sp_insert_actionplan' to add the action plan to the database
    await connection.query(
      `CALL sp_insert_actionplan('${JSON.stringify(input_json)}');`
    );
    // Send a success message as a JSON response to the client
    res.header("Access-Control-Allow-Origin");
    res.json({ message: "Plan de accion agregado!" });
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

/*
 * Adds a new action plan witto the database.
 *
 * @param {object} req - The HTTP request object containing a JSON representation of the action plan.
 * @param {object} res - The HTTP response object.
 * @returns {object} - A success message as a JSON response.
 *
 * Autor Steven Naranjo Mora
 * Fecha creacion 07/04/2023
 *
 */
const addActionPlanDetail = async (req, res) => {
  try {
    // Extract the JSON input from the request body
    const input_json = req.body;
    // Check if the input is undefined, and send a 400 Bad Request response if it is
    if (input_json === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    // Establish a database connection
    const connection = await getConnection();
    // Call the stored procedure 'sp_insert_actionplan' to add the action plan to the database
    await connection.query(
      `CALL sp_insert_action_plan_withDetails('${JSON.stringify(input_json)}');`
    );
    // Send a success message as a JSON response to the client
    //res.header('Access-Control-Allow-Origin');
    res.json({ message: "Plan de accion agregado Detallado!" });
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

/*
 * Updates an existing action plan in the database.
 *
 * @param {object} req - The HTTP request object containing a JSON representation of the updated action plan.
 * @param {object} res - The HTTP response object.
 * @returns {object} - A success message as a JSON response.
 * Autor Steven Naranjo Mora
 * Fecha creacion 07/04/2023
 */
const editActionPlan = async (req, res) => {
  try {
    // Extract the JSON input from the request body
    const input_json = req.body;
    // Check if the input is undefined, and send a 400 Bad Request response if it is
    if (input_json === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    // Establish a database connection
    const connection = await getConnection();
    // Call the stored procedure 'sp_update_actionplan' to update the action plan in the database
    await connection.query(
      `CALL sp_update_actionplan('${JSON.stringify(input_json)}');`
    );
    // Send a success message as a JSON response to the client
    res.header("Access-Control-Allow-Origin");
    res.json({ message: "Plan de accion editado!" });
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

/*
 * Deletes an existing action plan from the database.
 *
 * @param {object} req - The HTTP request object containing the ID of the action plan to delete.
 * @param {object} res - The HTTP response object.
 * @returns {object} - The result of the DELETE operation as a JSON response.
 *
 * Autor Steven Naranjo Mora
 * Fecha creacion 07/04/2023
 */
const deleteActionPlan = async (req, res) => {
  try {
    // Extract the ID of the action plan to delete from the request parameters
    const { id } = req.params;
    // Establish a database connection
    const connection = await getConnection();
    // Call the stored procedure 'sp_delete_actionplan' to delete the action plan from the database
    const result = await connection.query(`CALL sp_delete_actionplan( ${id});`);
    // Send the result of the DELETE operation as a JSON response to the client
    res.header("Access-Control-Allow-Origin");
    res.json(result);
  } catch (error) {
    // If there is an error, set the response status to 500 and send the error message to the client
    res.status(500);
    res.send(error.message);
  }
};

/*
 * Export an object with properties that correspond to the functions defined in this module.
 * This allows these functions to be used by other modules when this module is imported.
 */
export const methods = {
  getActionsPlans,
  getActionPlanByID,
  addActionPlan,
  editActionPlan,
  deleteActionPlan,
  getActionPlanDetailsByID,
  addActionPlanDetail,
};
