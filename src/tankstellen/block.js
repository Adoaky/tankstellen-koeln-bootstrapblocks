/**
 * BLOCK: wp-bootstrap-blocks/tankstelle
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import edit from './edit';
// import save from './save';
import { petrolStation } from '../icons';
import './editor.scss';
import './style.scss';
import './leaflet.css';

import metadata from './block.json';

registerBlockType( metadata.name, {
	title: __( metadata.title , 'wp-bootstrap-blocks' ),
	icon: petrolStation, // Icon from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:local_gas_station:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=gas&icon.size=24&icon.color=%23e8eaed
	keywords: [
		__( 'Container', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap Container', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
	],
	supports: metadata.supports,
	viewScript: metadata.viewScript,

	edit: edit,

	save: () => { return null }
} );
