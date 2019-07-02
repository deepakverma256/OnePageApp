define(['knockout'], function (ko) {

    function ProductViewModel(params) {
        self = this;
        self.product = params.value;
        self.productName = ko.observable(self.product.name)();
        self.skus = ko.observableArray(self.product.skus)();
        self.onlyColors = ko.computed(function () {
            var colors = ko.utils.arrayMap(self.skus, function (item) {
                return item.color;
            })
            console.log('Colors Before filter ', colors);
            return colors.sort().filter(function (a) { return !this[a] ? this[a] = true : false; }, {});
        });
        
        self.imageurl = ko.observable(self.skus[0].imageurl);
        self.selectedColor = ko.observable(self.skus[0].color);
        console.log('self.imageurl = ', self.imageurl());

        self.selectColor = ko.pureComputed({
            read: function () {
                return self.selectedColor();
            },
            write: function (param) {
                self.selectedColor(param);
                var skuFound = ko.utils.arrayFirst(self.skus, function (item) {
                    return item.color == param;
                });
                console.log('param = ', param);
                console.log('skuFound = ', skuFound);
                console.log('default sku before setting = ', self.imageurl());
                self.imageurl(skuFound.imageurl);
                console.log('default sku after setting = ', self.imageurl());
            }

        });
        
        self.sizes = ko.computed(function () {
            //var _self = self;
            var allSizes = ko.utils.arrayMap(self.skus, function (item) {
                if(self.selectedColor() == item.color){
                    return item.size;
                }else{
                    return 'some';
                }
            });
            allSizes = ko.utils.arrayFilter(allSizes, function(item) {
                return item != 'some' ? true : false;
            });
            console.log('Sizes found ', allSizes);
            return allSizes;
        });
    }

    ProductViewModel.prototype.resetDefaultSku = function (param) {
        self.selectedColor(param);
        var skuFound = ko.utils.arrayFirst(self.skus, function (item) {
            return item.color == param;
        });

        console.log('skuFound = ', skuFound);
        console.log('default sku before setting = ', self.imageurl());
        self.imageurl(skuFound.imageurl);
        console.log('default sku after setting = ', self.imageurl());
    };

    console.log('ProductViewModel.resetDefaultSku = ', ProductViewModel.prototype.resetDefaultSku);
    return ProductViewModel;
});