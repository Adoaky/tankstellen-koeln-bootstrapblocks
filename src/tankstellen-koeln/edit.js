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
	attributes: {marginAfter, map, cardLayout, displayMap, mapZoom},
	className,
	clientId,
	setAttributes,
} ) {

	className = `${className} card`;

	return (
		<>

			<InspectorControls>
				<PanelBody title={ __( 'Petrol station configuration', 'wp-boostrap-blocks')}>
					<ToggleControl
						label={ __( 'Display only one petrol station', 'wp-bootstrap-blocks' ) }
						checked={ displayMap.single }
						onChange={ ( isChecked ) => {
							setAttributes( { displayMap:{ single: isChecked, display: displayMap.display } } );
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
							}}
							placehlder={__('Petrol station adress', 'wp-bootstrap-blocks')}
							value={map.adresse}
							options= { petrolStationOpotions(tankstellen) }
						/>
					
					}

				</PanelBody>
				<PanelBody title={ __( 'Card Layout', 'wp-bootstrap-blocks' ) }>
					<TextControl 
						label={__('Zoom')}
						type='number'
						value={mapZoom}
						onChange={ (value) => { setAttributes( {mapZoom: value} ) } }
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



				<div class="card-body">
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
							height: "200px"
						}}
						center={map.geometry} 
						zoom={mapZoom} 
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={map.geometry}>
							<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</MapContainer>
				</>
				}
					<h5 class="card-title">{map.adresse}</h5>
				</div>
			</div>
		</>
	);
};