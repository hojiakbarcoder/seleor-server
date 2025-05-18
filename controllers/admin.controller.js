const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')

class AdminController {
	constructor() {
		this.userId = '68272cbfe44de24593a3eed1'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
		this.getCustomers = this.getCustomers.bind(this)
		this.getOrders = this.getOrders.bind(this)
		this.getTransactions = this.getTransactions.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
	}

	//[GET] /admin/products
	async getProducts(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not Admin' })
			const products = await productModel.find()
			return res.json({ success: 'Got products successfully', products })
		} catch (error) {
			next(error)
		}
	}
	//[GET] /admin/customers
	async getCustomers(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const customers = await userModel.find({ role: 'user' })
			return res.json({ success: 'Got customers successfully', customers })
		} catch (error) {
			next(error)
		}
	}
	//[GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const orders = await orderModel.find()
			return res.json({ success: 'Got orders successfully', orders })
		} catch (error) {
			next(error)
		}
	}
	//[GET] /admin/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const transactions = await transactionModel.find()
			return res.json({
				success: 'Got transactions successfully',
				transactions,
			})
		} catch (error) {
			next(error)
		}
	}

	//[POST] /admin/create-product
	async createProduct(req, res, next) {
		try {
			const data = req.body
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not Admin' })
			const newProduct = await productModel.create(data)
			if (!newProduct) return res.json({ failure: 'Failed creating product' })
			return res.json({ success: 'Product created successfully' })
		} catch (error) {
			next(error)
		}
	}

	//[PUT] /admin/update-product
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not Admin' })
			const updatedProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updatedProduct)
				return res.json({ failure: 'Failed while updating product' })
			return res.json({ success: 'Product updated successfully' })
		} catch (error) {
			next(error)
		}
	}
	//[PUT] /admin/update-order
	async updateOrder(req, res, next) {
		try {
			const { status } = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not Admin' })
			const updatedOrder = await orderModel.findByIdAndUpdate(id, { status })
			if (!updatedOrder)
				return res.json({ failure: 'Failed while updating order' })
			return res.json({ success: 'Order updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	//[DELETE] /admin/delete-product
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not Admin' })
			const deleteProduct = await productModel.findByIdAndDelete(id)
			if (!deleteProduct)
				return res.json({ failure: 'Failed while deleting product' })
			return res.json({ success: 'Product deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
