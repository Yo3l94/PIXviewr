declare module "react-facebook"

declare module "*.svg" {
	const content: any;
	export default content;
}

interface myReq<params> extends express.Request {
	query: params
}