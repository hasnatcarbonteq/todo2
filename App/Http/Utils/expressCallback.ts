import handleError from "./handleError";
import HttpStatusCodes from "@application/Utils/http-status-codes";

/**
 * @typedef {{body:object,headers?:object,statusCode?:number}} HttpResponse
 */

const makeExpressCallback = (controller) => {
    return async (req, res) => {
        const httpRequest = makeHttpRequest(req);
        const httpResponse = await controller(httpRequest);

        if (httpResponse instanceof Error) {
            return handleError(httpResponse, req, res);
        }

        const headers = httpResponse.headers || {
            "Content-Type": "application/json",
        };
        const statusCode =
            httpResponse && httpResponse.statusCode
                ? httpResponse.statusCode
                : HttpStatusCodes.OK;

        res.set(headers);

        res.status(statusCode).json({
            status: "success",
            data: httpResponse.body,
        });
    };
};

/**
 * @typedef {{files?: object[],file?:object,body:object,query:object,params:object,ip:string,method:string,path:string,headers:object,user?:object,adminUser?:object,decoded?:object,userId:string,isAdminRequest:boolean}} HttpRequest
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {HttpRequest}
 */
function makeHttpRequest(req) {
    return {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
            "Content-Type": req.get("Content-Type"),
            Referer: req.get("referer"),
            "User-Agent": req.get("User-Agent"),
            "Access-Control-Allow-Origin": "*",
        },
        clientIp: req.clientIp,
        decoded: req.decoded,
    };
}

export default makeExpressCallback;
