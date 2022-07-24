import { StateMarks } from './StateMarks'
import { CountyMarks } from './CountyMarks'
import { select, scaleThreshold, zoom, zoomIdentity } from 'd3'
import { useMemo, useRef, useEffect, useContext, useState } from 'react'
import { Legend } from './Legend'
import { geoPath } from 'd3-geo'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
import { ZoomControls } from './ZoomControls'

const path = geoPath()
export const ElectionMap = ({
  width,
  height,
  stateData,
  countyData,
  usMap
}) => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const svg = useRef()
  const marks = useRef()
  const _zoom = zoom()
    .scaleExtent([1, 20])
    .on('zoom', e => {
      appDispatch({ type: 'setZoomLevel', value: e.transform.k })
      select(marks.current).attr('transform', e.transform)
    })

  useEffect(() => {
    select(svg.current)
      .call(_zoom)
      .on('wheel.zoom', null)
      .on('mousedown.zoom', null)
  }, [])

  const disablePan = () => {
    select(svg.current)
      .call(_zoom)
      .on('wheel.zoom', null)
      .on('mousedown.zoom', null)
  }

  const enablePan = () => {
    select(svg.current).call(_zoom).on('wheel.zoom', null)
  }

  const demScale = useMemo(
    () =>
      scaleThreshold()
        .domain([0.5, 0.6, 0.7])
        .range(['#ceeafd', '#92bde0', '#5295cb', '#1375b7']),
    [scaleThreshold]
  )

  const repScale = useMemo(
    () =>
      scaleThreshold()
        .domain([0.5, 0.6, 0.7])
        .range(['#fce0e0', '#eaa9a9', '#db7171', '#c93135']),
    [scaleThreshold]
  )

  const handleStateClick = (e, feature) => {
    enablePan()
    document.querySelectorAll('.state-wrapper').forEach(el => {
      el.style.visibility = 'visible'
    })
    e.currentTarget.style.visibility = 'hidden'
    appDispatch({ type: 'updateActiveState', value: feature.id })

    let bounds = path.bounds(feature),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = 0.9 / Math.max(dx / width, dy / height),
      translate = [width / 2 - scale * x, height / 2 - scale * y]

    let transform = zoomIdentity
      .translate(translate[0], translate[1])
      .scale(scale)

    select(svg.current)
      .transition()
      .duration(750)
      .call(_zoom.transform, transform)

    appDispatch({ type: 'setZoomLevel', value: scale })
    appDispatch({
      type: 'setCenter',
      value: [x, y]
    })
  }

  const handleZoomIn = e => {
    enablePan()
    let currentZoom = appState.zoomLevel
    let newZoom = appState.zoomLevel * 3 > 20 ? 20 : appState.zoomLevel * 3

    let currentCenter = appState.center
    let newTranslation = [
      width / 2 - newZoom * currentCenter[0],
      height / 2 - newZoom * currentCenter[1]
    ]

    let transform = zoomIdentity
      .translate(newTranslation[0], newTranslation[1])
      .scale(newZoom)

    select(svg.current)
      .transition()
      .duration(750)
      .call(_zoom.transform, transform)

    appDispatch({ type: 'setZoomLevel', value: newZoom })
  }

  const handleDecreaseZoom = () => {
    let currentZoom = appState.zoomLevel
    let newZoom =
      Math.ceil(appState.zoomLevel / 3) === 1
        ? 1
        : Math.ceil(appState.zoomLevel / 3)
    document.querySelectorAll('.state-wrapper').forEach(el => {
      el.style.visibility = 'visible'
    })
    if (newZoom === 1) {
      disablePan()
      select(svg.current)
        .transition()
        .duration(750)
        .call(_zoom.transform, zoomIdentity)
      appDispatch({
        type: 'setCenter',
        value: [width / 2, height / 2]
      })
    } else {
      enablePan()
      let currentCenter = appState.center
      let newTranslation = [
        width / 2 - newZoom * currentCenter[0],
        height / 2 - newZoom * currentCenter[1]
      ]

      let transform = zoomIdentity
        .translate(newTranslation[0], newTranslation[1])
        .scale(newZoom)

      select(svg.current)
        .transition()
        .duration(750)
        .call(_zoom.transform, transform)
    }

    appDispatch({ type: 'setZoomLevel', value: newZoom })
  }

  const handleResetZoom = () => {
    disablePan()
    select(svg.current).call(_zoom.transform, zoomIdentity)

    appDispatch({ type: 'resetZoomLevel' })
    document.querySelectorAll('.state-wrapper').forEach(el => {
      el.style.visibility = 'visible'
    })
    appDispatch({
      type: 'updateActiveState',
      value: null
    })
    appDispatch({
      type: 'setCenter',
      value: [width / 2, height / 2]
    })
  }

  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin"
        ref={svg}
      >
        <defs>
          {/* gradients for flipped states */}

          <linearGradient
            id="dem-flip"
            gradientUnits="userSpaceOnUse"
            x2="5"
            spreadMethod="repeat"
            gradientTransform="rotate(45)"
          >
            <stop offset="0" stopColor="#00478F" />
            <stop offset="0.65" stopColor="#00478F" />
            <stop offset="0.65" stopColor="#036fb0" />
            <stop offset="1.0" stopColor="#036fb0" />
          </linearGradient>
          <linearGradient
            id="gop-flip"
            gradientUnits="userSpaceOnUse"
            x2="5"
            spreadMethod="repeat"
            gradientTransform="rotate(45)"
          >
            <stop offset="0" stopColor="#B52C30" />
            <stop offset="0.65" stopColor="#B52C30" />
            <stop offset="0.65" stopColor="#D75B5F" />
            <stop offset="1.0" stopColor="#D75B5F" />
          </linearGradient>
        </defs>
        {/* <Legend
          width={width}
          colorScale={colorScale}
          legendWidth={legendWidth}
        /> */}
        <g ref={marks}>
          {useMemo(() => {
            return (
              <CountyMarks
                usMap={usMap}
                countyData={countyData}
                demScale={demScale}
                repScale={repScale}
                path={path}
              />
            )
          }, [usMap, countyData, demScale, repScale, path])}

          <StateMarks
            stateData={stateData}
            usMap={usMap}
            handleStateClick={handleStateClick}
            path={path}
          />
        </g>
      </svg>
      <ZoomControls
        handleZoomIn={handleZoomIn}
        handleDecreaseZoom={handleDecreaseZoom}
        handleResetZoom={handleResetZoom}
      />
    </>
  )
}
