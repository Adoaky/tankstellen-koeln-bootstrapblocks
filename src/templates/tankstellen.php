<?php
/**
 * Template for wp-bootstrap-blocks/tankstellen
 *
 * This template can be overridden by copying it to theme/wp-bootstrap-blocks/container.php.
 *
 * @package wp-bootstrap-blocks/templates/container
 * @version 2.0.0
 */

/**
 * Block attributes.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * The following attributes are available:
 *
 * @var $attributes array(
 *   'isFluid' (boolean) => Defines if container should be fluid.
 *   'fluidBreakpoint' (string) => Defines till which breakpoint the container should be fluid.
 *   'marginAfter' (string) => Margin bottom class which should be added to the block (eg. 'mb-2').
 *   'className' (string) => Additional class names which should be added to block.
 * )
 */

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

$classes = array( 'wp-bootstrap-blocks-Tankstellen', 'card' );

if ( array_key_exists( 'map', $attributes ) && $attributes['map'] ) {
    $adresse = $attributes['map']['adresse'];
} 
if ( array_key_exists( 'mapZoom', $attributes ) && $attributes['mapZoom'] ) {
	
} 
if ( array_key_exists( 'mapHeight', $attributes ) && $attributes['mapHeight'] ) {
	
} 
if ( array_key_exists( 'displayMap', $attributes ) && $attributes['displayMap'] ) {
	
} 
if ( array_key_exists( 'cardLayout', $attributes ) && $attributes['cardLayout'] ) {
	array_push( $classes, $attributes['cardLayout'] );
} 
if ( array_key_exists( 'marginAfter', $attributes ) && ! empty( $attributes['marginAfter'] ) ) {
	array_push( $classes, $attributes['marginAfter'] );
}
if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
	array_push( $classes, $attributes['className'] );
}

/**
 * Filters container block classes.
 *
 * @since 1.0.0
 *
 * @param array $classes Classes which should be added to the block.
 * @param array $attributes Block attributes.
 */
$classes = apply_filters( 'wp_bootstrap_blocks_container_classes', $classes, $attributes );
?>
<div class="<?= esc_attr( implode( ' ', $classes ) ); ?>">
    <div class="card-body">
        <h5 class="card-title"><?= $adresse ?></h5>
    </div>
</div>
