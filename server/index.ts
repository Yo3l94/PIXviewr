require('es6-promise').polyfill();
require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');

import { NextFunction, Request, Response } from 'express';
import { createApi } from 'unsplash-js'
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic } from 'unsplash-js/dist/methods/topics/types';
import { Basic as PhotosBasic, Full } from 'unsplash-js/dist/methods/photos/types';

// interface myReq<ParsedQs> extends Request {
// 	query: ParsedQs
// }

const PORT = 3001;

const helmet = require('helmet');
const app = express();
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

app.use(cors());

const unsplash = createApi({
	accessKey: 'zFF2JTkyPnVzYCe20N1thTAyks6huzXoxJYWj3KTNyQ'
});

app.get('/topics', (req: Request, res: Response) => {
	unsplash.topics.list({
		page: 1,
		perPage: 10,
	})
		.then((result: ApiResponse<{ results: Basic[]; total: number; }>) => {
			console.log('Result', result)
			if (result.errors) {
				console.log('error occurred: ', result.errors);
				throw res.status(500).send({
					status: 500,
					error: 'Not found'
				})
			} else {
				const topics = result.response;
				console.log(topics);
				return res.send(topics)
			}
		})
})

app.get('/topic-photos', (req: any, res: Response) => {
	console.log(req.query)
	unsplash.topics.getPhotos({ topicIdOrSlug: req.query.id, page: req.query.page, perPage: req.query.perPage })
		.then((result: ApiResponse<{ results: PhotosBasic[]; total: number; }>) => {
			console.log(' topic photos Result', result)
			if (result.errors) {
				console.log('error occurred: ', result.errors);

				throw res.status(500).send({
					status: 500,
					error: 'Not found'
				})
			} else {
				const topicPhotos = result.response;
				console.log(topicPhotos.results.map((photo: PhotosBasic) => photo.id));
				return res.json(topicPhotos)
			}
		})
})

app.get('/photos', (req: any, res: Response) => {

	unsplash.photos.get({ photoId: req.query.id })
		.then((result: ApiResponse<Full>) => {
			if (result.errors) {
				console.log('error occurred: ', result.errors);
				res.sendStatus(500);
				throw result.errors[0];
			} else {
				const photo = result.response;
				console.log(photo);
				return res.json(photo)
			}
		})
})

app.use((req: Request, res: Response) => {
	res.status(404).send({
		status: 404,
		error: 'Not found'
	})
})

app.listen(PORT, function () {
	console.log(`Server started at ${PORT}`);
});