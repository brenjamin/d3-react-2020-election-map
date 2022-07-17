export const Tooltip = ({ activeCounty, data }) => {
  const county = data.find(county => county.fips === activeCounty.id)

  return county ? (
    <div id="tooltip" data-education={county.bachelorsOrHigher} style={{ left: activeCounty.x + 20, top: activeCounty.y - 10 }}>
      {county.area_name}, {county.state}: {county.bachelorsOrHigher}%
    </div>
  ) : (
    <></>
  )
}
