<ul>
   <li <?php if( ! isset($_GET['menu']) || $_GET['menu'] == 'abandoned_cart' ){ ?> class="webpushr_13fw3_active_menu" <?php } ?>><a href="admin.php?page=webpushr-configuration&menu=abandoned_cart#woocommerce_settings">Abandoned Cart</a></li>
   <li <?php if( isset($_GET['menu']) && $_GET['menu'] == 'new_product' ){ ?> class="webpushr_13fw3_active_menu" <?php } ?>><a href="admin.php?page=webpushr-configuration&menu=new_product#woocommerce_settings">New Product</a></li>
   <li <?php if( isset($_GET['menu']) && $_GET['menu'] == 'price_drop' ){ ?> class="webpushr_13fw3_active_menu" <?php } ?>><a href="admin.php?page=webpushr-configuration&menu=price_drop#woocommerce_settings">Price Drop</a></li>
   <li <?php if( isset($_GET['menu']) && $_GET['menu'] == 'sale_price' ){ ?> class="webpushr_13fw3_active_menu" <?php } ?>><a href="admin.php?page=webpushr-configuration&menu=sale_price#woocommerce_settings">Sale Price</a></li>
</ul>        
