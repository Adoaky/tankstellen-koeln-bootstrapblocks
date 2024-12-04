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
import { useState } from '@wordpress/element';
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

let fluidBreakpointOptions = [
	{
		label: __( 'Xl', 'wp-bootstrap-blocks' ),
		value: 'xl',
	},
	{
		label: __( 'Lg', 'wp-bootstrap-blocks' ),
		value: 'lg',
	},
	{
		label: __( 'Md', 'wp-bootstrap-blocks' ),
		value: 'md',
	},
	{
		label: __( 'Sm', 'wp-bootstrap-blocks' ),
		value: 'sm',
	},
];

// MARK: Card Layoutoptions
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

const addEveryMarker = () => {
	let output = [];
	tankstellen.features.forEach( station => {
			output.push(
				<Marker position={[station.geometry.y , station.geometry.x]}>
					<Popup>
						{station.attributes.adresse}
					</Popup>
				</Marker>
			)
		}
	)
	
	return output;
}

export default function Edit ( {
	attributes: {isFluid, fluidBreakpoint, marginAfter, map, cardLayout, displayMap, mapZoom, mapHeight, tankstellenList},
	setAttributes,
} ) {

	// MARK: rerender map
	const [seed, setSeed] = useState(1);
	const reset = () => { setSeed(Math.random()) }

	const blockProps = useBlockProps({
		className: `${cardLayout} ${fluidBreakpoint} ${marginAfter}`
	});

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
							setAttributes({
								tankstellenList: petrolStationOpotions(tankstellen) 
							})
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
				<PanelBody title={ __( 'Fluid', 'wp-bootstrap-blocks' ) }>
					<CheckboxControl
						label={ __( 'Fluid', 'wp-bootstrap-blocks' ) }
						checked={ isFluid }
						onChange={ ( isChecked ) => {
							setAttributes( { isFluid: isChecked } );
						} }
					/>
					<SelectControl
						label={ __(
							'Fluid Breakpoint',
							'wp-bootstrap-blocks'
						) }
						disabled={ ! isFluid }
						value={ fluidBreakpoint }
						options={ fluidBreakpointOptions }
						onChange={ ( selectedFluidBreakpoint ) => {
							setAttributes( {
								fluidBreakpoint: selectedFluidBreakpoint,
							} );
						} }
						help={ __(
							'Fluid breakpoints only work with Bootstrap v4.4+. The container will be 100% wide until the specified breakpoint is reached, after which max-widths for each of the higher breakpoints will be applied.',
							'wp-bootstrap-blocks'
						) }
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


			<div {...blockProps}>

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
						
						{displayMap.single !== true &&
							addEveryMarker()
						}
						
						{displayMap.single !== false && map.adresse !== "" &&
							
							<Marker position={map.geometry}>
								<Popup>
								{map.adresse}
								</Popup>
							</Marker>
					
						}

					</MapContainer>
				</>
				}

				<div className="card">
					<h5 className="card-title">
						{ displayMap.single !== false ? map.adresse : __('Search..', 'wp-boostrap-blocks') }
					</h5>
				</div>
			</div>
		</>
	);
};