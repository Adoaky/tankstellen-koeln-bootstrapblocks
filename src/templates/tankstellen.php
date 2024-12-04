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
 */

/**
 * Block content.
 * Defined in wp_bootstrap_blocks_get_template() which requires this template.
 *
 * @var $content string
 */

// function createEveryMarker(data) {
//     data.
// }

$key = bin2hex(random_bytes(7));

$classes = array( 'wp-bootstrap-blocks-tankstellen', 'card');

if ( array_key_exists( 'map', $attributes ) && $attributes['map'] ) {
    $adresse = $attributes['map']['adresse'];
    $geo     = $attributes['map']['geometry'];
} 
if ( array_key_exists( 'mapZoom', $attributes ) && $attributes['mapZoom'] ) {
	$zoom = $attributes['mapZoom'];
} 
if ( array_key_exists( 'mapHeight', $attributes ) && $attributes['mapHeight'] ) {
	$height = $attributes['mapHeight'];
} 
if ( array_key_exists( 'tankstellenList', $attributes ) && $attributes['tankstellenList'] ) {
    
    // function createMarker () {
    //     $output = '';
    //     foreach( $attributes['tankstellenList'] as $item){
         
    //         $output .= "L.marker([{$item['geometry']['y']},{$item['geometry']['x']}]).addTo(map).bindPopup('{$item['label']}');";
    //     }
    //     var_dump($attributes['tankstellenList']);
    //     return $output;
    // }
}
if ( array_key_exists( 'displayMap', $attributes ) && $attributes['displayMap'] ) {
    if($attributes['displayMap']['display'] === true && $attributes['displayMap']['single'] === false ){
        
        // $tankstellenListMarker = createMarker();
    }
} 
if ( array_key_exists( 'cardLayout', $attributes ) && $attributes['cardLayout'] ) {
	array_push( $classes, $attributes['cardLayout'] );
} 

if ( array_key_exists( 'isFluid', $attributes ) && $attributes['isFluid'] ) {
	if ( array_key_exists( 'fluidBreakpoint', $attributes ) && ! empty( $attributes['fluidBreakpoint'] ) ) {
		array_push( $classes, 'container-' . $attributes['fluidBreakpoint'] );
	} else {
		array_push( $classes, 'container-fluid' );
	}
} else {
	array_push( $classes, 'container' );
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
$classes = apply_filters( 'wp_bootstrap_blocks_tankstellen_classes', $classes, $attributes );
?>

<!-- vorläufiger Import der leaflet JS -->
<link 	
    rel="stylesheet" 
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin="">
</script>

<div class="<?= esc_attr( implode( ' ', $classes ) ); ?>" style="--map-height:<?= "{$height}px" ?>">
    
    <div id="<?= "map-{$key}" ?>"  ></div>
    <div class="card-body">
        <h5 class="card-title"><?= $adresse ?></h5>
    </div>
</div>

<script>
    
    let map = L.map('<?= "map-{$key}" ?>',{})
    .setView(
        [<?= implode(',',$geo) ?>], 
        <?= $zoom ?>
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // L.marker([<?= implode(',',$geo) ?>]).addTo(map)
    //     .bindPopup("<?= $adresse ?>")
    //     .openPopup();

    <? if(function_exists('createMaker')){createMarker();} ?>
</script>