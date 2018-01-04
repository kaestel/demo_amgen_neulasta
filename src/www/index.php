<? include_once($_SERVER['LOCAL_PATH']."/includes/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Neulasta</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=1024; initial-scale=1.0; maximum-scale=1.0;" />

	<? if($_SESSION["dev"]) { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
		<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>
	<? } else { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
		<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script>
	<? } ?>

</head>

<body class="i:validdevice">

<div id="navigation" class="i:navigation">
	<h4 class="index">Index</h4>
	<h4 class="references">References</h4>
	<h4 class="track">
		<span>Humanity</span>
		<span>Economy</span>
	</h4>
	<div class="progress"></div>
	<ul class="references">
		<li><a href="index_bio.php">Biosimilars</a></li>
		<li><a href="index_bio.php?slide=3">Why is Neulasta<sup>&reg;</sup> different?</a></li>
		<li><a href="index_bio.php?slide=5">References</a></li>
	</ul>
</div>

<div id="sidebar"></div>

<div id="display">

	<div id="presentation" class="i:presentation">

		<div class="slide front">
			<h1>Frontpage</h1>
			<h2>Entrance</h2>
		</div>

		<div class="slide slide_e1 i:neulastaE1">
			<h1>Relative Dose Intensity</h1>
			<h2>Overview of benefits</h2>
			<div class="no_drag"></div>
			<canvas class="graph"></canvas>
			<div>
				<div class="sliderA"></div>
				<div class="sliderB"></div>
				<div class="sliderC"></div>
				<div class="sliderD"></div>
				<div class="sliderE"></div>
			</div>
			<div class="reduction">
				<div class="slider"></div>
				<div class="numbers"></div>
				<div class="slider_imitation"></div>
			</div>
			<div class="tumor"></div>
		</div>

		<div class="slide slide_e2 i:neulastaE2">
			<div class="canvas">
				<h1>Absolute Neutrophil Count (ANC)</h1>
				<div class="slider"></div>
			</div>
		</div>

		<div class="slide slide_e3 i:neulastaE3">
			<h1>Survival</h1>
			<div class="green_button"></div>
			<div class="yellow_button"></div>
			<div class="red_button"></div>
		</div>

		<div class="slide slide_e4 i:neulastaE4">
			<h1>Choose Perspective</h1>
			<h2>Choose Perspective</h2>
			<div class="economic">Economic</div>
			<div class="clinical">Clinical</div>
		</div>

		<div class="slide tracks slide_1AB">

			<div class="track track_a slide_1_a">
				<h1>Exploring the impact of FN for your hospital</h1>
				<h2>Your situation</h2>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>

			<div class="track track_b slide_1_b i:neulasta1B">
				<h1>Cost of Febrile Neutropenia</h1>
				<h2>Impact of FN</h2>
				<h3>Cost of managing FN for different management options</h3> 
				<div class="left_graph"></div>
				<div class="right_graph"></div>
				<div class="click_area">
					<div class="click_area_green"></div>
					<div class="click_area_orange"></div>
					<div class="click_area_red"></div>
					<div class="click_area_blue"></div>
				</div>
				<div class="move_on_button id:slide_1_b_2"></div>
				<div class="calc_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>

			<div class="subslide slide_1_b_2 i:neulastaClose">
				<h1>Cost of Febrile Neutropenia</h1>
				<h3>Mean duration of hospitalization due to febrile neutropenia (FN) (days)</h3>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>		

		</div>

		<div class="slide tracks slide_2AB">

			<div class="track track_a slide_2_a_1 i:neulasta2A1">
				<h1>Neulasta<sup>&reg;</sup> reduces Febrile Neutropenia<br />by more than 90% compared to placebo</h1>
				<h2>Reducing Febrile Neutropenia</h2>
				<h3>Neulasta<sup>&reg;</sup> significantly reduces febrile neutropenia</h3>

				<div class="matchesA">
					<div class="matchesB"></div>
				</div>
				
				<!--div class="matches">
					<div class="fire"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
				</div>
				<div class="match_texts">
					<div class="hospital"></div>
					<div class="hospital_prevent"></div>
				</div-->
				<div class="move_on_button id:slide_2_a_1_2"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>
		
			<div class="subslide slide_2_a_1_2 i:neulasta2A12 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup>  reduces Febrile<br />Neutropenia by more than 90%</h1>
				<h3>Neulasta<sup>&reg;</sup> significantly reduces febrile neutropenia</h3>
				<div class="move_on_button id:slide_2_a_1_3"></div>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>

			<div class="subslide slide_2_a_1_3 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup>  reduces Febrile<br />Neutropenia by more than 90%</h1>
				<h3>Chemotherapy delivery is best supported by Neulasta<sup>&reg;</sup></h3>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>


			<div class="track track_b slide_2_b_1 i:neulasta2B1">
				<h1>Neulasta<sup>&reg;</sup> reduces Hospitalization<br />by more than 90%</h1>
				<h2>Reducing Hospitalization</h2>
				<h3>Neulasta<sup>&reg;</sup> primary prohylaxis vs. placebo</h3>

					<div class="matchesA">
						<div class="matchesB"></div>
					</div>
					<!--div class="fire"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
					<div class="ice"></div>
				</div>
				<div class="match_texts">
					<div class="hospital"></div>
					<div class="protected"></div>
				</div-->
				<div class="move_on_button id:slide_2_b_1_2"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div><strong></strong>
			</div>

			<div class="subslide slide_2_b_1_2 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup>  reduces Hospitalization<br />by more than 90%</h1>
				<h3>Neulasta<sup>&reg;</sup> primary prohylaxis vs. placebo</h3>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>

		</div>

		<div class="slide tracks slide_3AB">

			<div class="track track_a slide_3_a_1 i:neulasta3A1">
				<h1>Neulasta<sup>&reg;</sup> reduces Febrile<br />Neutropenia by 83% compared to placebo</h1>
				<h2>Reduces FN by 83%</h2>
				<h3>Incidence of FN (all cycles)</h3>
				<h3 class="close_reduses_header">Neulasta<sup>&reg;</sup> significantly reduces FN impact</h3>
				<div class="incidence id:slide_3_a_1_2"></div>
				<div class="reduces id:slide_3_a_1_3"></div>
				<div class="close_button close_incidence"></div>
				<div class="close_button close_reduses"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div><strong></strong>
			</div>
<!--
			<div class="subslide slide_3_a_1_2 i:neulasta3A12 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup> reduces Febrile<br />Neutropenia by 83%</h1>
				<h3>Incidence of FN (all cycles)</h3>
				<div class="move_on_button id:slide_3_a_1_3"></div>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>
	
			<div class="subslide slide_3_a_1_3 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup> reduces Febrile<br />Neutropenia by 83%</h1>
				<h3>Neulasta<sup>&reg;</sup> significantly reduces FN impact</h3>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>
-->
		
			<div class="track track_b slide_3_b_1 i:neulasta3B1">
				<h1>Neulasta<sup>&reg;</sup> reduces FN and related costs<br />by 50% compared to daily G-CSF</h1>
				<h2>Reduces FN and related costs by 50%</h2>
				<h3>Neulasta<sup>&reg;</sup> halves hospitalization cause by to febrile neutropenia</h3>
				<div class="hospital id:slide_3_b_1_2"></div>
				<div class="antibio id:slide_3_b_1_4"></div>
				<div class="close_button close_hospital"></div>
				<div class="close_button close_antibio"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div><strong></strong>
			</div>
		
			<div class="subslide slide_3_b_1_2 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup> reduces FN and related costs<br />by 50% compared to daily G-CSF</h1>
				<h3>Neulasta<sup>&reg;</sup> halves hospitalization cause by to febrile neutropenia</h3>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>
<!--
			<div class="subslide slide_3_b_1_3 i:neulasta3B13 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup>  reduces FN and related costs by 50% compared to daily G-CSF</h1>
				<h3>Neulasta<sup>&reg;</sup> halves hospitalization cause by to febrile neutropenia</h3>
				<div class="pills"></div>
				<div class="move_on_button id:slide_3_b_1_4"></div>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>
-->	
			<div class="subslide slide_3_b_1_4 i:neulastaClose">
				<h1>Neulasta<sup>&reg;</sup>  reduces FN and related costs<br />by 50% compared to daily G-CSF</h1>
				<h3>Neulasta<sup>&reg;</sup> halves hospitalization cause by to febrile neutropenia</h3>
				<div class="close_button"></div>
				<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
			</div>

		</div>

		<div class="slide slide_4_a i:neulasta4a">
			<h1>Easy to Manage</h1>
			<h2>Easy to Manage</h2>
			<div class="couple"></div>
			<div class="couple_text">
				I can receive my CT as planned which allows me the plan my CT days with the kids, my partner, my caregiver etc.<br /><br />
				No need to change my schedule and planning due to unplanned CT cycle delays. <br /><br />
				I can get through this CT period as smoothly as possible<br />
				- being able to stay on CT schedule provides me with the best outcomes<br />of my CT.
			</div>
			<div class="doctor"></div>
			<div class="doctor_text">
				Optimal G-CSF support allow for improved chemotherapy delivery and therefore, improved RDI.<br /><br />
				Better RDI will lead to better treatment outcomes (including survival).<br /><br />
				No need to worry about compliance as one injection provides optimal protection for each patients through the neutrophil mediated clearance.<br /><br />
				Optimal G-CSF dosing through self regulating mechanism avoids inadequate dosing and wasteful dosing.<br /><br />
			</div>
			<div class="nurse"></div>
			<div class="nurse_text">
				No need for multiple injections leaving more time to spend on other responsibilities or extensive training/ instructions for self injections.<br /><br />
				No need to emphasize the importance of continuing the complete number of injections as one shots provides optimal protection through decreased incidence of FN and dose delays there is less need to reschedule patients in an already busy CT ward.
			</div>
			<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
		</div>

		<div class="slide slide_5_a">
			<h1>Summary calculator</h1>
			<h2>Neulasta&reg; investments</h2>
			<div class="reference"><span>- Adapted from Vogel, C. et al.<i>j Clin Oncal. 2005;</i> 23:1178-1184</span></div>
		</div>

		<div class="slide slide_6_a i:neulasta6A">
			<h1>Protection of Neulasta<sup>&reg;</sup></h1>
			<h2>Neulasta&reg;</h2>
				<!--div class="big_match"></div>
				<div class="sectors">
					<div class="anc"></div>
					<div class="anc_arrow"></div>
					<div class="fn"></div>
					<div class="fn_arrow"></div>
					<div class="rdi"></div>
					<div class="rdi_arrow"></div>
					<div class="survival"></div>
				</div>
				<div class="links">
					<div class="anc_link"></div>
					<div class="fn_link"></div>
					<div class="rdi_link"></div>
					<div class="survival_link"></div>
				</div>
				<div class="texts">
					<div class="anc_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
					<div class="fn_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
					<div class="rdi_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
					<div class="survival_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
				</div-->
		</div>

		<div class="slide exit">
			<h1>Exitpage</h1>
		</div>

	</div>
</div>	
</body>
</html>