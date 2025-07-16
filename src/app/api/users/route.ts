// src/app/api/users/route.ts

import { handleUserCreate } from "@/server/controllers/user.controller";

export const POST = handleUserCreate;
