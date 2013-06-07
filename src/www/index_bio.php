<? include_once($_SERVER['FRAMEWORK_PATH']."/include/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Neulasta</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=1024; initial-scale=1.0; maximum-scale=1.0;" />

	<? if($_SESSION["dev_includes"]) { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
		<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>
	<? } else { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
		<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script>
	<? } ?>

</head>

<body class="i:validdevice">

<div id="navigation" class="bio i:navigation">
	<h4 class="index">Index</h4>
	<h4 class="references">References</h4>
	
	<ul class="references">
		<li><a href="index.php">Home</a></li>
	</ul>
</div>

<div id="sidebar"></div>

<div id="display">

	<div id="presentation" class="i:presentation">
	
		<div class="slide slide_7_a i:neulasta7A">
			<h2>Biosimilars</h2>
			<div class="study_button"></div>
			<div class="popup"></div>
			<div class="close_study_button"></div>
			<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
		</div>

		<div class="slide slide_8_a i:neulasta8A">
			<h1>Biosimilarity</h1>
			<div class="show_more"></div>
			<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
		</div>

		<!--div class="slide slide_9_a i:neulasta9A">
			<h1>Non-substitution law<br />- European comparison</h1>
			<div class="countries">
				<div class="sweden">Sweden</div>
			</div>
			<div class="text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</div>
			<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
		</div-->

		<div class="slide tracks slide_moa">
			
			<div class="track_a track track_moa_1 slide_moa_1 i:moa1">
				<h1>The difference starts at the molecular level</h1>
				<h2>Why is Neulasta<sup>&reg;</sup> different?</h2>
				<div class="move_on_button id:slide_moa_1_1"></div>
			</div>
	
			<div class="subslide slide_moa_1_1 i:moa11 i:neulastaClose">
				<h1>How does pegylation influence clearance</h1>
				<div class="switch_area id:slide_moa_1_2"></div>
				<div class="close_button"></div>
			</div>
			
			<div class="subslide slide_moa_1_2 i:moaVideo i:neulastaClose">
				<h1>How does pegylation influence clearance</h1>
				<div class="i:videos videos">
					<video class="video" controls="controls" poster="img/bg_video_center.jpg"></video>
					<div class="thumb thumb_a src:video/MOA_animation_V2.mp4"></div>
					<div class="thumb thumb_b src:video/MOA_animation02_V3.mp4"></div>
				</div>
				<div class="close_button"></div>
			</div>
			
		</div>	
		
		<div class="slide slide_moa_2 i:moa2">
			<h1>Neulasta<sup>&reg;</sup> reduces the relative risk of FN and related complications</h1>
			<div class="switch_area"></div>
		</div>
		
		<div class="slide slide_11_a">
			<h1>References</h1>
			<h2>References</h2>
		</div>
		

	</div>
</div>	
</body>
</html>