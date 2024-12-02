/**
 * BLOCK: wp-bootstrap-blocks/tankstellen-koeln
 */

// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import edit from './edit';
import { petrolStation } from '../icons';
import './editor.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	title: __( metadata.title , 'wp-bootstrap-blocks' ), // Block title.
	icon: petrolStation,
	keywords: [
		__( 'Container', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap Container', 'wp-bootstrap-blocks' ),
		__( 'Bootstrap', 'wp-bootstrap-blocks' ),
	],
	supports: metadata.supports,
	attributes: metadata.attributes,

	edit: edit,

	save() {
		return () => null;
	},
} );
