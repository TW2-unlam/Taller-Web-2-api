
import mongoose from 'mongoose'
var Product = mongoose.model('Product');

// Listar productos.
exports.get = function(req:any, res:any) {
    Product.find(function(err: any, data: any){
        if (err) {
            return res.send(500, err);
        }
        return res.send(data);
    });
};

// Detalle de Producto
exports.show = function(req: any, res: any) {
    Product.findById(req.params.id, function(err: any, post: any){
        if(err)
          res.send(err);
        res.json(post);
    });
};
