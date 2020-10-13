<?php
	$link = mysqli_connect("mysql-site.alwaysdata.net", "site", "A37377912074a", "site_films"); 

	$type = $_POST['type'];

	$page = $_POST['page'];
   	$page *= 5;

	$pagesize = $_POST['pagesize'];

	$query;
	$querysum;
	
	switch ($type) {
		case '3':
			$query = "SELECT * FROM `VideoInfo` WHERE `type` IN ('foreign-movie','russian-movie') LIMIT {$page}, {$pagesize}";
			$querysum ="SELECT * FROM `VideoInfo` WHERE `type` IN ('foreign-movie','russian-movie')";
			break;

		case '4':
			$query = "SELECT * FROM `VideoInfo` WHERE `type` IN ('russian-serial','foreign-serial','multi-part-film','documentary-serial')LIMIT {$page}, {$pagesize}";
			$querysum ="SELECT * FROM `VideoInfo` WHERE `type` IN ('russian-serial','foreign-serial','multi-part-film','documentary-serial')";
			break;

		case '5':
			$query = "SELECT * FROM `VideoInfo` WHERE `type` IN ('russian-serial','foreign-serial','multi-part-film','documentary-serial') AND `countries` LIKE '%Корея%' OR '%Южная%' OR '%Япония%' OR '%Тайвань%' OR '%Гонконг%' LIMIT {$page}, {$pagesize}";
			$querysum ="SELECT * FROM `VideoInfo` WHERE `type` IN ('russian-serial','foreign-serial','multi-part-film','documentary-serial') AND `countries` LIKE '%Корея%' OR '%Южная%' OR '%Япония%' OR '%Тайвань%' OR '%Гонконг%'";
			break;

		case '6':
			$query = "SELECT * FROM `VideoInfo` WHERE `type` IN ('anime','anime-serial') LIMIT {$page}, {$pagesize}";
			$querysum ="SELECT * FROM `VideoInfo` WHERE `type` IN ('anime','anime-serial')";
			break;
	}

	$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
	$resultsum = mysqli_query($link, $querysum) or die("Ошибка " . mysqli_error($link)); 

	$rows = mysqli_num_rows($resultsum);
	$r = mysqli_fetch_all($result);
	$products = array('video' => $r, 'length' => $rows);

	echo json_encode($products);
?>