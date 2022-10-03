<?php
namespace GFNL\ProductQtyIncrements\Helper;

/**
 * Helper from stackexchange
 *
 * @link https://magento.stackexchange.com/a/358656
 */


use Magento\Catalog\Model\Product;
use Magento\CatalogInventory\Api\StockRegistryInterface;
use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;

class Stock extends AbstractHelper
{
    protected StockRegistryInterface $stockRegistry;

    public function __construct(
        Context $context,
        StockRegistryInterface $stockRegistry
    ) {
        parent::__construct($context);
        $this->stockRegistry = $stockRegistry;
    }

    public function getProductQtyIncrements(Product $product)
    {
        $stockItem = $this->stockRegistry->getStockItem(
            $product->getId(),
            $product->getStore()->getWebsiteId()
        );

        $value = $stockItem->getQtyIncrements();
        if (!$product->isSaleable()) {
            $value = false;
        }

        return $value;
    }
}
