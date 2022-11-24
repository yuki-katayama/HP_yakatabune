import companies from "@/assets/data/company";
import type { IncomingMessage, ServerResponse } from "http";

export default defineEventHandler((event: IncomingMessage) => {
  if (event.req.method === "GET") {
    console.log("get companies");
    return JSON.stringify(companies);
  } else if (event.req.method === "POST") {
    // create a blog
    // return the blog;
  } else if (event.req.method === "PUT") {
    //update a blog by id
    // return the blog;
  } else if (event.req.method === "DELETE") {
    // delete a blog by id
    // return success;
  }
});
