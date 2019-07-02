console.log("loading ProductListingArea behaviour");

//performLateBinding(viewModel, 'effect-element');

ko.components.register('product-tile', {
    viewModel: { require: '../components/Product/ProductViewModel' },
    template: {require : 'text!../components/Product/product-template.html'}
});

performLateBinding(productsViewModel, 'products-list');