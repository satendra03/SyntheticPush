// src/app/api/users/route.ts

import { handleUserCreate } from "@/server/controllers/user.controller";

console.log("This is users route");
export const POST = handleUserCreate;
