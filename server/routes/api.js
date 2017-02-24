import Router from 'koa-router';
import bookController from '../controllers/book';
import tagController from '../controllers/tag';

const router = new Router();

router.prefix('/api');

router.get('/books', bookController.getBooks);
router.get('/books/:tag', bookController.getBooksByTag);

router.get('/tags', tagController.getTags);

export default router;
