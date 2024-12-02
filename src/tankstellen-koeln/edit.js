// WordPress dependencies
import { __ } from '@wordpress/i18n';
import {
	CheckboxControl,
	PanelBody,
	SelectControl,
	ComboboxControl,
	ToggleControl,
	TextControl 
} from '@wordpress/components';

import { applyFilters } from '@wordpress/hooks';

import { 
	InspectorControls,
	useBlockProps
 } from '@wordpress/block-editor';

import { isBootstrap5Active } from '../helper';

// tankstellen Import
import tankstellen from '../assets/tankstellen.json';

// react leaflet
import { 
	MapContainer, 
	TileLayer, 
	Marker, 
	Popup
} from 'react-leaflet';
import { useState } from '@wordpress/element';

let marginAfterOptions = [
	{
		label: __( 'Small', 'wp-bootstrap-blocks' ),
		value: 'mb-2',
	},
	{
		label: __( 'Medium', 'wp-bootstrap-blocks' ),
		value: 'mb-3',
	},
	{
		label: __( 'Large', 'wp-bootstrap-blocks' ),
		value: 'mb-5',
	},
];
marginAfterOptions = applyFilters(
	'wpBootstrapBlocks.container.marginAfterOptions',
	marginAfterOptions
);

marginAfterOptions = [
	{
		label: __( 'None', 'wp-bootstrap-blocks' ),
		value: 'mb-0',
	},
	...marginAfterOptions,
];

let cardLayoutOptions = [
	{ label: __('Top', 		'wp-bootstrap-blocks'), value: 'top'},
	{ label: __('bottom', 	'wp-bootstrap-blocks'), value: 'bottom'},
	{ label: __('Left', 	'wp-bootstrap-blocks'), value: 'left'},
	{ label: __('Right', 	'wp-bootstrap-blocks'), value: 'right'},
]

// MARK: Mapping options from JSON-Data

const petrolStationOpotions = (data) => {
	let output = data.features.map( obj => ( {
			label: 		obj.attributes.adresse, 
			value:  	obj.attributes.adresse,
			id: 	 	obj.attributes.objectid,
			geometry: 	[obj.geometry.y , obj.geometry.x]
			} 
		)
	);

	return output;
}

export default function Edit ( {
	attributes: {marginAfter, map, cardLayout, displayMap, mapZoom, mapHeight},
	className,
	clientId,
	setAttributes,
} ) {

	// MARK: rerender map
	const [seed, setSeed] = useState(1);
	const reset = () => { setSeed(Math.random()) }

	className = `${className} ${cardLayout}`;

	return (
		<>

			<InspectorControls>
				<PanelBody title={ __( 'Petrol station configuration', 'wp-boostrap-blocks')}>
					<ToggleControl
						label={ __( 'Display only one petrol station', 'wp-bootstrap-blocks' ) }
						checked={ displayMap.single }
						onChange={ ( isChecked ) => {
							setAttributes( { 
								displayMap:{ single: isChecked, display: displayMap.display },
								map: {
									id: 0,
									geometry: [50.923288946783785,6.979491940887355],
									adresse:  ""								
								}
							} );
							reset();
						} }
					/>

					{displayMap.single === true &&
					
						<ComboboxControl
							label={ __('Search a petrol station', 'wp-bootstrap-blocks')}
							onChange={(value) => {
								setAttributes({
									map: {
										id: 	  petrolStationOpotions(tankstellen).find( obj => obj.label == value).id,
										geometry: petrolStationOpotions(tankstellen).find( obj => obj.label == value).geometry,
										adresse:  value								
									}
								});
								reset();
							}}
							placehlder={__('Petrol station adress', 'wp-bootstrap-blocks')}
							value={map.adresse}
							options= { petrolStationOpotions(tankstellen) }
							allowReset={false}
						/>
					
					}
					<TextControl 
						label={__('Zoom')}
						type='number'
						value={mapZoom}
						onChange={ (value) => { 
							setAttributes( {mapZoom: value} ) 
							reset();
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Card Layout', 'wp-bootstrap-blocks' ) }>
					<SelectControl
						label={ __( 'Map Position', 'wp-bootstrap-blocks' ) }
						value={ cardLayout }
						options={ cardLayoutOptions }
						onChange={ ( value ) => {
							setAttributes( {
								cardLayout: value,
							} );
						} }
					/>
					<TextControl 
						label={__('Map height')}
						type='number'
						value={mapHeight}
						onChange={ (value) => { 
							setAttributes( {mapHeight: value} ) 
							reset();
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Margin', 'wp-bootstrap-blocks' ) }>
					<SelectControl
						label={ __( 'Margin After', 'wp-bootstrap-blocks' ) }
						value={ marginAfter }
						options={ marginAfterOptions }
						onChange={ ( selectedMarginAfter ) => {
							setAttributes( {
								marginAfter: selectedMarginAfter,
							} );
						} }
					/>
				</PanelBody>
			</InspectorControls>


			<div className={className}>

			{displayMap.display === true &&
				<>
					<link 	
						rel="stylesheet" 
						href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
						integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
						crossorigin=""
					/>

					<MapContainer 
						style={{
							height: `${mapHeight}px`
						}}
						center={map.geometry} 
						zoom={mapZoom} 
						scrollWheelZoom={false}
						key={seed}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={map.geometry}>
							<Popup>
							{map.adresse}
							</Popup>
						</Marker>
					</MapContainer>
				</>
				}

				<div class="card">
					<h5 class="card-title">{map.adresse}</h5>
				</div>
			</div>
		</>
	);
};