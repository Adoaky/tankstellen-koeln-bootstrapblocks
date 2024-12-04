<?php
/**
 * Register wp-bootstrap-blocks/tankstellen block type.
 *
 * @package wp-bootstrap-blocks/tankstellen
 */

namespace WP_Bootstrap_Blocks\Tankstellen;

use WP_Bootstrap_Blocks\Block_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '\WP_Bootstrap_Blocks\Tankstellen\Tankstellen_Block_Type', false ) ) :

	/**
	 * Class Tankstellen_Block_Type
	 */
	class Tankstellen_Block_Type extends Block_Type {
		/**
		 * Name of block type including namespace.
		 *
		 * @var string
		 */
		protected $name = 'wp-bootstrap-blocks/tankstellen';

		/**
		 * Block attributes.
		 *
		 * @var array
		 */
		protected $attributes = [
			'map' => array(
				'type' => 'object',
			),
			'mapZoom' => array(
				'type' => 'number',
			),
			'mapHeight' => array(
				'type' => 'number',
			),
			'displayMap' => array(
				'type' => 'object',
			),
			'cardLayout' => array(
				'type' => 'string',
			),
			'tankstellenList' => array(
				'type' => 'object',
			),
			'isFluid' => array(
				'type' => 'boolean',
			),
			'fluidBreakpoint' => array(
				'type' => 'string',
			),
			'marginAfter' => array(
				'type' => 'string',
			),
		];

		/**
		 * Default values of block attributes.
		 *
		 * @var array
		 */
		protected $default_attributes = array(
			'map' => [ 
				"id" => 0, 
				"geometry" => [50.923288946783785,6.979491940887355], 
				"adresse"=>  ""],
			'mapZoom' => 10,
			'mapHeight' => 200,
			'displayMap' => [
				"single" => false, 
				"display" => true
			],
			'cardLayout' => 'top',
			'tankstellenList' => [''],
			'isFluid' => false,
			'fluidBreakpoint' => '',
			'marginAfter' => 'mb-2',
		);

	}

endif;
