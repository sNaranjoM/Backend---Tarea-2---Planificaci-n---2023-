import { request, response, Router } from "express";
import { methods as actionsPlans } from "./../controllers/actionplans.controller";


const router = Router();

router.get("/listar",actionsPlans.getActionsPlans);
router.get("/listarDetalles/:id",actionsPlans.getActionPlanDetailsByID);
router.get("/buscar/:id", actionsPlans.getActionPlanByID);
router.post("/agregar", actionsPlans.addActionPlan);
router.post("/editar", actionsPlans.editActionPlan);
router.delete("/eliminar/:id", actionsPlans.deleteActionPlan);
router.post("/agregarConDetalle", actionsPlans.addActionPlanDetail);


export default router;
