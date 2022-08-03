import { Router } from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";

import { CreateLinksController } from "./controller/CreateLinksController";
import { CreateUserController }  from "./controller/CreateUserController";
import { ListUserController }    from "./controller/ListUserController";
import { RedirectController }    from "./controller/RedirectController";
import { ensureAuth }            from "./middlewares/ensureAuth";
import { ensureKey }             from "./middlewares/ensureKey";

export const routes = Router();

routes.post('/users', new CreateUserController().handle);
routes.post('/login', new AuthenticateUserController().handle);

routes.get('/user',   ensureAuth, new ListUserController().handle);

routes.post('/:key?/links', ensureAuth, ensureKey, new CreateLinksController().handle); 
routes.get('/:code',  ensureAuth, new RedirectController().handle);