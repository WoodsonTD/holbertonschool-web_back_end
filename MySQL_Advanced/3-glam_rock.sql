-- Query to list Glam rock bands ranked by longevity
SELECT band_name, lifespan
FROM metal_bands
WHERE split LIKE '%Glam rock%'
ORDER BY lifespan;
