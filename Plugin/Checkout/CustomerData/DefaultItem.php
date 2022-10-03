<?php
namespace GFNL\ProductQtyIncrements\Plugin\Checkout\CustomerData;

use Magento\Quote\Model\Quote\Item;

class DefaultItem
{
    public function __construct(
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \GFNL\ProductQtyIncrements\Helper\Stock $stockHelper
    ) {
        $this->productRepository = $productRepository;
        $this->stockHelper=$stockHelper;
    }
    public function aroundGetItemData($subject, \Closure $proceed, Item $item)
    {
        $data = $proceed($item);

        $product = $this->productRepository->getById($item->getProduct()->getId());

        $atts = [
            "getProductQtyIncrements" => $this->stockHelper->getProductQtyIncrements($product)
        ];

        return array_merge($data, $atts);
    }
}
