class AdminController {
	constructor() {
		this.userId = '68209e4ceed3a0d3587b3b36'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
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
