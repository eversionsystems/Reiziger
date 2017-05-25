<?php
	
	session_start();
	
	$glevel = (isset($_GET['glevel'])) ? $_GET['glevel'] : $_POST['glevel'];
	$sub_type = (isset($_GET['sub_type'])) ? $_GET['sub_type'] : $_POST['sub_type'];
	$flevel = (isset($_GET['flevel'])) ? $_GET['flevel'] : $_POST['flevel'];
	$nuts = (isset($_GET['nuts'])) ? $_GET['nuts'] : $_POST['nuts'];
	$gweek = (isset($_GET['gweek'])) ? $_GET['gweek'] : $_POST['gweek'];
	$bweek = (isset($_GET['bweek'])) ? $_GET['bweek'] : $_POST['bweek'];
	$flower = (isset($_GET['flower'])) ? $_GET['flower'] : $_POST['flower'];
	$reuse = (isset($_GET['resub'])) ? $_GET['resub'] : $_POST['resub'];
	$rsize = (isset($_GET['rsize'])) ? $_GET['rsize'] : $_POST['rsize'];
	$reservior = (isset($_GET['rese'])) ? $_GET['rese'] : $_POST['rese'];
	$cond = (isset($_GET['cond'])) ? $_GET['cond'] : $_POST['cond'];
	$waterh = (isset($_GET['waterh'])) ? $_GET['waterh'] : $_POST['waterh'];
	$customwater = (isset($_GET['customwater'])) ? $_GET['customwater'] : $_POST['customwater'];
	$valhide = (isset($_GET['valhide'])) ? $_GET['valhide'] : $_POST['valhide'];
	
	if(isset($valhide)) {
		$chkcount = count($valhide);
	}
	//print_r($valhide);
	for($chk=0; $chk < 16; $chk++){
		$plus = $chk+1;
		$chked[$plus] = 'checked';
		//echo($plus. " ");
		//echo($valhide[$chk] . " ");
		if(isset($valhide)) {
			foreach($valhide as $chkcount) {
				if($glevel == 0 ) {
					$chked[$chk] = 'checked';
				} else if($glevel == 1 && ($plus == $chkcount)) {
					$chked[$chkcount] = '';
				} else if($glevel == 2 && ($plus == $chkcount)) {
					$chked[$chkcount] = '';
				}
				/*if($plus == $chkcount) {
					echo  'Hello ';
				}*/
			}
		} else {		
			if($glevel == 0 ) {
				$chked[$chk] = 'checked';
			} else if($glevel == 1 ) {
				$chked[2] = $chked[10] = '';
				$chked[8] = $chked[16] = '';
			} else if($glevel == 2 ) {
				$chked[$plus] = '';
				if($reuse == 1) {
					$chked[6] = $chked[14] =  'checked';
					$chked[2] = $chked[10] =  'checked';
				}
			}
		}
	}
	
	if(isset($valhide)) {
		foreach($valhide as $chkcount) {
			//echo($chkcount . " ");
			$chked[$chkcount] = '';
		}
	}
	
	if($chked[7] == 'checked') {
		$bmineralchk = 1;	
	} else {
		$bmineralchk = 0;
	}
	
	/*if($chked[15] == 'checked') {
		$mbmineralchk = 1;	
	} else {
		$mbmineralchk = 0;
	}*/
	
	//echo 'Minearl Dsk'.$bmineralchk;
	//echo 'Minearl Mob'.$mbmineralchk;
	
	if($glevel < 0) $glevel = 0;
	if($sub_type < 0) $sub_type = 0;
	if($cond < 0) $cond = 0;
	if($waterh < 0) $waterh = 0;
	if($reservior < 0) $reservior = 1;
	if($rsize < 1) $rsize = 1;
	
	$totgr = 0;
	$totrt = 0;
	$totbm = 0;
	$totgb = 0;
	$totbb = 0;
	
	$mtotgr = 0;
	$mtotrt = 0;
	$mtotbm = 0;
	$mtotgb = 0;
	$mtotbb = 0;
	
	//Convert ML to OZ
	function covt_oz($cml){
		$coz = $cml*0.033814;
		return number_format($coz,1,'.','');
	}
	
	//Convert OZ to Litre
	function covt_oztolit($cml){
		$coz = $cml/0.033814;
		return number_format($coz,2,'.','');
	}
	
	//Convert ML to Litre
	function covt_mltolit($cml,$lt){
		$lt = $lt * 1000;
		$flt = $cml/$lt;
		return number_format($flt,4,'.','');
	}
	
	//Convert Litre to Gallon
	function covt_gal($clit){
		$cgal = $clit/0.264172;
		return number_format($cgal,4,'.','');
	}
	
	//Convert EC to PPM Truncheon
	function covt_ppmt($cec){
		$cppmt = $cec * 700;
		return $cppmt;
	}
	
	//Convert EC to PPM Eutech
	function covt_ppme($cec){
		$cppme = $cec * 640;
		return $cppme;
	}
	
	//Convert EC to PPM Hanna
	function covt_ppmh($cec){
		$cppmh = $cec * 500;
		return $cppmh;
	}
	
	//Convert EC to CF
	function covt_cf($cec){
		$ccf = $cec * 10;
		return $ccf;
	}
	
	//Calculate product EC
	function pro_ec($cec,$proval){
		$proec = $cec / $proval;
		return number_format($proec,4,'.','');
	}
	
	//Calculate Product Amount
	function amt_cal($cec,$proec,$ressize){
		$amt = ($cec / $proec)*$ressize;
		return number_format($amt,1,'.','');
	}
	
	//Calculate Product Price
	function price_cal($litres,$price){
		$fprice = $litres * $price;
		return number_format($fprice,2,'.','');
	}
	
	//Calculate Product Percentage
	function perc_cal($ttlest,$price){
		$fperc = ($price * 100)/ $ttlest;
		return number_format($fperc,2,'.','');
	}
	
	if($waterh == 1) { //RO
		$water = 0.0;
	} else if($waterh == 2) { //Soft
		$water = 0.2;
	} else if($waterh == 3) { //Medium
		$water = 0.4;
	} else if($waterh == 4) { //Hard
		$water = 0.6;
	}
	
	if($cond == 1) { //EC
		$cwater = $water;
		$bscwater = $cwater;
	} else if($cond == 2) { //PPM Trunchoen
		$cwater = covt_ppmt($water);
		$bscwater = $cwater;
	} else if($cond == 3) { //PPM Eutech
		$cwater = covt_ppme($water);
		$bscwater = $cwater;
	} else if($cond == 4) { //PPM Hanna
		$cwater = covt_ppmh($water);
		$bscwater = $cwater;
	} else if($cond == 5) { //CF
		$cwater = covt_cf($water);
		$bscwater = $cwater;
	}
	
	if(isset($customwater)) { //Custom
		$cwater = $customwater;
		$bscwater = $cwater;
	}
	
	$data = '';
	$grow_mobile_data = '';
	$bloom_mobile_data = '';
	$cost_mobile_data = '';
	
	$data .= '<div class="section-method3">
		<div class="wrapper clearfix"><div class="stage-full-dv">
				<article>
					<h2>Grow Stage</h2>
					<p>It doesn\'t matter if you are growing cuttings, seedlings or mother plants, this guide delivers big lush green plants with an enhanced vigour and vibrancy.</p>
				</article>
				<div class="table-col">
					<div class="th-col">
						<div class="th-div th-col-1"><span>Plant Stage</span></div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-GrowA.png"></label>
							</div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-GrowB.png"></label>
							</div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-Root.png"></label>
							<span><div class="chk-fix">
							<input type="checkbox" name="radiohide[]" id="stage-dgroot" value="1" '.$chked[1].' ><label for="stage-dgroot"></label>
							</div></span></div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-GrowBooster.png"></label>
							<span><div class="chk-fix">
							<input type="checkbox" name="radiohide[]" id="stage-dggrow" value="2" '.$chked[2].' ><label for="stage-dggrow"></label>
							</div></span></div>
						<div class="th-div"> &nbsp;
							<!--<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-Minerals.png"></label>
							<span>
							<input type="checkbox" name="radiohide[]" id="stage" value="3" '.$chked[3].' ><label for="stage"></label>
							</span>--></div>
						<div class="th-div"> &nbsp;
							<!--<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-Bud.png"></label>
							<span>
							<input type="checkbox" name="radiohide[]" id="stage" value="4" '.$chked[4].' ><label for="stage"></label>
							</span>--></div>
					</div>
					<div class="tr-col">
						<div class="row-dv">
							<div class="tr-div tr-col-1">Seedling & Cutting</div>
							<div class="tr-div tr-col-2">Week</div>
							<div class="tr-div tr-col-3">EC</div>
							<div class="tr-div tr-col-4">EC+Water</div>
							<div class="tr-div blank-col">&nbsp;</div>
							<div class="tr-div tr-col-5">Grow Food A</div>
							<div class="tr-div tr-col-5">Grow Food B</div>
							<div class="tr-div tr-col-5">Root Booster</div>
							<div class="tr-div tr-col-5">Grow Booster</div>
							<div class="tr-div tr-col-5">&nbsp;</div>
							<div class="tr-div tr-col-5">&nbsp;</div>
						</div>';
				
				/* Grow Stage Calculation*/
				for($i = 0; $i <= $gweek; $i++) {
					if($i == 0) { // week 0
						$rtval = 4.00000;
						$gbval = 0;
						$bbval = 0;
						$bmval = 0;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.70;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.2697;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 0.90;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.63248;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.10;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.99525;
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.70;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.47108;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 0.90;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.89139;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.10;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.3117;
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.40;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.774453;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 0.60;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.59552;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 0.80;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 3.44652;
							}
						}	
					} else if( $i > 0 && $i < 4) { // week 1-3
						$rtval = 2.00000;
						$gbval = 2.50000;
						$bbval = 0;
						$bmval = 0;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.90;
																
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.63248;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 1.10;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.99525;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.30;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.35802;
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.90;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 1.87038;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 1.10;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.29069;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.30;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.711;
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.70;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $water;
								$gfval = 2.93592;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 0.90;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 3.78691;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.10;
																
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 4.6379;
							}
						}	
					} else if( $i >= 4 && $i <= 20) { // week 4-20
						$rtval = 2.00000;
						$gbval = 2.50000;
						$bbval = 2.00000;
						$bmval = 0;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$gtec = 1.20;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.17663;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 1.40;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.53941;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.60;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.90218;
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$gtec = 1.10;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.26967;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 1.30;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 2.68998;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.50;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 3.11029;
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$gtec = 0.30;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 3.82946;
							} else if($flevel == 1) { // Food Level - Normal
								$gtec = 1.10;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 4.68045;
							} else if($flevel == 2) { // Food Level - High
								$gtec = 1.30;
								
								if($cond == 1) { //EC
									$gtec = $gtec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$gtec = covt_ppmt($gtec);
									
								} else if($cond == 3) { //PPM Eutech
									$gtec = covt_ppme($gtec);
									
								} else if($cond == 4) { //PPM Hanna
									$gtec = covt_ppmh($gtec);
									
								} else if($cond == 5) { //CF
									$gtec = covt_cf($gtec);
									
								}
								
								$wthrd = $gtec + $cwater;
								$gfval = 5.53144;
							}
						}	
					}
					
					$proec = pro_ec($gtec, $gfval);
					$gamount =  amt_cal($gtec,$proec,$rsize);
					
					$prortec = pro_ec($gtec, $rtval);
					$rtamount =  amt_cal($gtec,$prortec,$rsize);
					
					if($gbval > 0){
						$progbec = pro_ec($gtec, $gbval);
						$gbamount =  amt_cal($gtec,$progbec,$rsize);
					} else {
						$gbamount = 0;
					}
					
					if($bbval > 0){
						/*if($flower == 1) {
							$bbval = $bbval * 2;
						}*/
						$probbec = pro_ec($gtec, $bbval);
						$bbamount =  amt_cal($gtec,$probbec,$rsize);
					} else {
						$bbamount = 0;
					}
					
					if($bmval > 0){
						$probmec = pro_ec($gtec, $bmval);
						$bmamount =  amt_cal($gtec,$probmec,$rsize);
					} else {
						$bmamount = 0;
					}
					
					if($reservior == 2){
						$gamount = covt_gal($gamount);
						$rtamount = covt_gal($rtamount);
						$gbamount = covt_gal($gbamount);
						$bbamount = covt_gal($bbamount);
						$bmamount = covt_gal($bmamount);
					} else {
						$gamount = $gamount;
						$rtamount = $rtamount;
						$gbamount = $gbamount;
						$bbamount = $bbamount;
						$bmamount = $bmamount;
					}
					
					$bbamount = 0;
					$bmamount = 0;
					
						$mgamount = $gamount;
						$mrtamount = $rtamount;
						$mgbamount = $gbamount;
						$mbbamount = $bbamount;
						$mbmamount = $bmamount;
					
					if(isset($valhide)) {
						for($n=0; $n <= $chkcount; $n++) {
						  if($valhide[$n] == 1) {
								$rtamount = 0;
							} else if($valhide[$n] == 2) {
								$gbamount = 0;
							} else if($valhide[$n] == 3) {
								$bmamount = 0;
							} else if($valhide[$n] == 4) {
								$bbamount = 0;
							}
						}
					} else {
						if($glevel == 0){
						
						} else if($glevel == 1){
							$gbamount = 0;
						} else if($glevel == 2){
							$rtamount = 0;
							if($reuse == 1) {
								$gbamount = $gbamount;
							} else {
								$gbamount = 0;	
							}
							//$gbamount = 0;
						}
					}
										
					if($nuts == 0) {
						$ml = '<small>oz</small>';
						$gamount = covt_oz($gamount);
						$finalgr = number_format($gamount,1).$ml;
						
						/*if($rtamount > 0){*/
							$rtamount = covt_oz($rtamount);
							$finalrt = number_format($rtamount,1).$ml;
						/*} else {
							$finalrt = '&nbsp;';
						}*/
						
						/*if($gbamount > 0){*/
							$gbamount = covt_oz($gbamount);
							$finalgb = number_format($gbamount,1).$ml;
						/*} else {
							$finalgb = '&nbsp;';
						}*/
						
						if($bbamount > 0){
							$bbamount = covt_oz($bbamount);
							$finalbb = number_format($bbamount,1).$ml;
						} else {
							$finalbb = '&nbsp;';
						}
						
						if($bmamount > 0){
							$bmamount = covt_oz($bmamount);
							$finalbm = number_format($bmamount,1).$ml;
						} else {
							$finalbm = '&nbsp;';
						}
						
					} else {
						$ml = '<small>mL</small>';
						
						if($rsize > 3) {
							$finalgr = round($gamount).$ml;
						} else {
							$finalgr = round($gamount,1).$ml;
						}
						
						/*if($rtamount > 0){*/
							if($rsize > 3) {
								$finalrt = round($rtamount).$ml;
							} else {
								$finalrt = round($rtamount,1).$ml;	
							}
						/*} else {
							$finalrt = '&nbsp;';
						}*/
						
						/*if($gbamount > 0){*/
							if($rsize > 3) {
								$finalgb = round($gbamount).$ml;
							} else {
								$finalgb = round($gbamount,1).$ml;	
							}
						/*} else {
							$finalgb = '&nbsp;';
						}*/
						
						if($bbamount > 0){
							if($rsize > 3) {
								$finalbb = round($bbamount).$ml;
							} else {
								$finalbb = round($bbamount,1).$ml;	
							}
						} else {
							$finalbb = '&nbsp;';
						}
						
						if($bmamount > 0){
							if($rsize > 3) {
								$finalbm = round($bmamount).$ml;
							} else {
								$finalbm = round($bmamount,1).$ml;	
							}
						} else {
							$finalbm = '&nbsp;';
						}
					}
					
					$totgr = $totgr + $gamount;
					$totrt = $totrt + $rtamount;
					if($gbamount > 0){
						$totgb = $totgb + $gbamount;
					}
					if($bbamount > 0){
						$totbb = $totbb + $bbamount;
					}
					if($bmamount > 0){
						$totbm = $totbm + $bmamount;
					}
					
					if($nuts == 0) {
						$finaltotgr = $totgr.$ml;
						$finaltotrt = $totrt.$ml;
						$finaltotgb = $totgb.$ml;
						$finaltotbb = $totbb.$ml;
						$finaltotbm = $totbm.$ml;
					} else {
						$finaltotgr = round($totgr).$ml;
						$finaltotrt = round($totrt).$ml;
						$finaltotgb = round($totgb).$ml;
						$finaltotbb = round($totbb).$ml;
						$finaltotbm = round($totbm).$ml;
					}
					
					/*if($finaltotrt > 0) {
							
					} else {
						$finaltotrt = '&nbsp;';	
					}
					
					if($finaltotgb > 0) {
							
					} else {
						$finaltotgb = '&nbsp;';	
					}
					
					if($finaltotbb > 0) {
							
					} else {
						$finaltotbb = '&nbsp;';	
					}
					
					if($finaltotbm > 0) {
							
					} else {
						$finaltotbm = '&nbsp;';	
					}*/
					
					if($i==2) {
						$grow = 'Grow';
					} else {
						$grow = '&nbsp;';
					}
					
					if($i < 2) {
						$plant = 'Cutting & Seedling';
						$plant_img = 'http://dev.reiziger.com/wp-content/uploads/2015/10/seedling-img1.png';
					} else {
						$plant = 'Grow';
						$plant_img = 'http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img2.png';	
					}
					
					if($i <= 9) {
						$week_num = '0'.$i;
					} else {
						$week_num = $i;
					}
					
					$data .= '<div class="row-dv bdr-dv ft-z">
								<div class="tr-div tr-col-1">'.$grow.'</div>
								<div class="tr-div tr-col-2">'.$week_num.'</div>
								<div class="tr-div tr-col-3">'.$gtec.'</div>
								<div class="tr-div tr-col-4">'.$wthrd.'</div>
								<div class="tr-div blank-col">&nbsp;</div>
								<div class="tr-div tr-col-5">'.$finalgr.'</div>
								<div class="tr-div tr-col-5">'.$finalgr.'</div>
								<div class="tr-div tr-col-5">'.$finalrt.'</div>
								<div class="tr-div tr-col-5">'.$finalgb.'</div>
								<div class="tr-div tr-col-5">'.$finalbm.'</div>
								<div class="tr-div tr-col-5">'.$finalbb.'</div>
							</div>';
							
					/* Mobile Carousel */
					if(isset($valhide)) {
						for($n=0; $n <= $chkcount; $n++) {
						  if($valhide[$n] == 9) {
								$mrtamount = 0;
							} else if($valhide[$n] == 10) {
								$mgbamount = 0;
							} else if($valhide[$n] == 11) {
								$mbmamount = 0;
							} else if($valhide[$n] == 12) {
								$mbbamount = 0;
							}
						}
					} else {
						if($glevel == 0){
						
						} else if($glevel == 1){
							$mgbamount = 0;
						} else if($glevel == 2){
							$mrtamount = 0;
							if($reuse == 1) {
								$mgbamount = $mgbamount;
							} else {
								$mgbamount = 0;	
							}
							//$mgbamount = 0;
						}
					}
										
					if($nuts == 0) {
						$ml = '<small>oz</small>';
						$mgamount = covt_oz($gamount);
						$mfinalgr = number_format($mgamount,1).$ml;
						
						/*if($mrtamount > 0){*/
							$mrtamount = covt_oz($mrtamount);
							$mfinalrt = number_format($mrtamount,1).$ml;
						/*} else {
							$mfinalrt = '&nbsp;';
						}*/
						
						/*if($mgbamount > 0){*/
							$mgbamount = covt_oz($mgbamount);
							$mfinalgb = number_format($mgbamount,1).$ml;
						/*} else {
							$mfinalgb = '&nbsp;';
						}*/
						
						if($mbbamount > 0){
							$mbbamount = covt_oz($mbbamount);
							$mfinalbb = number_format($mbbamount,1).$ml;
						} else {
							$mfinalbb = '&nbsp;';
						}
						
						if($mbmamount > 0){
							$mbmamount = covt_oz($mbmamount);
							$mfinalbm = number_format($mbmamount,1).$ml;
						} else {
							$mfinalbm = '&nbsp;';
						}
						
					} else {
						$ml = '<small>mL</small>';
						
						if($rsize > 3) {
							$mfinalgr = round($mgamount).$ml;
						} else {
							$mfinalgr = round($mgamount,1).$ml;
						}
						
						/*if($mrtamount > 0){*/
							if($rsize > 3) {
								$mfinalrt = round($mrtamount).$ml;
							} else {
								$mfinalrt = round($mrtamount,1).$ml;	
							}
						/*} else {
							$mfinalrt = '&nbsp;';
						}*/
						
						/*if($mgbamount > 0){*/
							if($rsize > 3) {
								$mfinalgb = round($mgbamount).$ml;
							} else {
								$mfinalgb = round($mgbamount,1).$ml;	
							}
						/*} else {
							$mfinalgb = '&nbsp;';
						}*/
						
						if($mbbamount > 0){
							if($rsize > 3) {
								$mfinalbb = round($mbbamount).$ml;
							} else {
								$mfinalbb = round($mbbamount,1).$ml;	
							}
						} else {
							$mfinalbb = '&nbsp;';
						}
						
						if($mbmamount > 0){
							if($rsize > 3) {
								$mfinalbm = round($mbmamount).$ml;
							} else {
								$mfinalbm = round($mbmamount,1).$ml;	
							}
						} else {
							$mfinalbm = '&nbsp;';
						}
					}
					
					$mtotgr = $mtotgr + $mgamount;
					$mtotrt = $mtotrt + $mrtamount;
					if($mgbamount > 0){
						$mtotgb = $mtotgb + $mgbamount;
					}
					if($mbbamount > 0){
						$mtotbb = $mtotbb + $mbbamount;
					}
					if($mbmamount > 0){
						$mtotbm = $mtotbm + $mbmamount;
					}
					
					if($nuts == 0) {
						$mfinaltotgr = $mtotgr.$ml;
						$mfinaltotrt = $mtotrt.$ml;
						$mfinaltotgb = $mtotgb.$ml;
						$mfinaltotbb = $mtotbb.$ml;
						$mfinaltotbm = $mtotbm.$ml;
					} else {
						$mfinaltotgr = round($mtotgr).$ml;
						$mfinaltotrt = round($mtotrt).$ml;
						$mfinaltotgb = round($mtotgb).$ml;
						$mfinaltotbb = round($mtotbb).$ml;
						$mfinaltotbm = round($mtotbm).$ml;
					}
					
					/*if($mfinaltotrt > 0) {
							
					} else {
						$mfinaltotrt = '&nbsp;';	
					}
					
					if($mfinaltotgb > 0) {
							
					} else {
						$mfinaltotgb = '&nbsp;';	
					}
					
					if($mfinaltotbb > 0) {
							
					} else {
						$mfinaltotbb = '&nbsp;';	
					}
					
					if($mfinaltotbm > 0) {
							
					} else {
						$mfinaltotbm = '&nbsp;';	
					}*/
							
					$grow_mobile_data .='<div class="item">
									<div class="stage-silde">
										<div class="stage-row"> <span>Plant Stage</span></div>
										<div class="cl"></div>
										<div class="sel-img"><img src="'.$plant_img.'"></div>
										<div class="sel-text">
											<div class="week-col"> <span class="s-stage">'.$plant.'</span> <span>Week</span>'.$week_num.'</div>
											<div class="week-col ec-col"> <ul><li><span class="s-state">EC</span>'.$gtec.'</li><li><span>EC+Water</span>'.$wthrd.'</li></ul></div>
											<div class="week-col ec-col-new"> <span class="s-state">Grow Food A&B</span>'.$mfinalgr.'</div>
											<div class="week-col ec-col-new"> <span class="s-state">Root Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-groot" value="9" '.$chked[9].' ><label for="stage-groot"></label></div></span>'.$mfinalrt.'</div>
											<div class="week-col ec-col-new"> <span class="s-state">Grow Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-ggrow" value="10" '.$chked[10].' ><label for="stage-ggrow"></label></div></span>'.$mfinalgb.'</div>
										</div>
									</div>
								</div>';
				}
				$data .='<div class="row-dv total-dv bdr-dv ft-z">
							<div class="tr-div tr-col-1">&nbsp;</div>
							<div class="tr-div tr-col-2 tal-dv">Total</div>
					
							<div class="tr-div blank-col">&nbsp;</div>
							<div class="tr-div tr-col-5">'.$finaltotgr.'</div>
							<div class="tr-div tr-col-5">'.$finaltotgr.'</div>
							<div class="tr-div tr-col-5">'.$finaltotrt.'</div>
							<div class="tr-div tr-col-5">'.$finaltotgb.'</div>
							<!--<div class="tr-div tr-col-5">'.$finaltotbm.'</div>
							<div class="tr-div tr-col-5">'.$finaltotbb.'</div>-->
						</div>
					</div>
				</div>
			</div>';
            /* END OF Grow Stage Calculation */
			
			$data.='<div class="stage-full-dv">
				<article>
					<h2>Bloom Stage</h2>
					<p>This guide delivers powerful plants and promises to help add mass and bulk to your colas by harvest time.</p>
				</article>
				<div class="table-col">
					<div class="th-col">
						<div class="th-div th-col-1"><span>Plant Stage</span></div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-BloomA.png"></label>
							</div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-BloomB.png"></label>
							</div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-Root.png"></label>
							<span><div class="chk-fix">
							<input type="checkbox" name="radiohide[]" id="stage-dbroot" value="5" '.$chked[5].'><label for="stage-dbroot"></label>
							</div></span></div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-GrowBooster.png"></label>
							<span><div class="chk-fix">
							<input type="checkbox" name="radiohide[]" id="stage-dbgrow" value="6" '.$chked[6].'><label for="stage-dbgrow"></label>
							</div></span></div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-Minerals.png"></label>
							<span><div class="chk-fix">
							<input type="checkbox" name="radiohide[]" id="stage-dbminerals" value="7" '.$chked[7].'><label for="stage-dbminerals"></label>
							</div></span></div>
						<div class="th-div">
							<label for="stage"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Stage-Bud.png"></label>
							<span><div class="chk-fix">
							<input type="checkbox" name="radiohide[]" id="stage-dbbud" value="8" '.$chked[8].'><label for="stage-dbbud"></label>
							</div></span></div>
					</div>
					<div class="tr-col">
						<div class="row-dv">
							<div class="tr-div tr-col-1">Bloom</div>
							<div class="tr-div tr-col-2">Week</div>
							<div class="tr-div tr-col-3">EC</div>
							<div class="tr-div tr-col-4">EC+Water</div>
							<div class="tr-div blank-col">&nbsp;</div>
							<div class="tr-div tr-col-5">Bloom  Food A</div>
							<div class="tr-div tr-col-5">Bloom  Food B</div>
							<div class="tr-div tr-col-5">Root Booster</div>
							<div class="tr-div tr-col-5">Grow Booster</div>
							<div class="tr-div tr-col-5">Bloom Minerals</div>
							<div class="tr-div tr-col-5">Bud Booster</div>
						</div>';
					
					/* Bloom Stage Calculation */
					for($w = 1; $w <= 2; $w++) {
						// week 1-2
						$bsrtval = 0.50000;
						$bsgbval = 2.50000;
						$bsbbval = 2.00000;
						$bsbmval = 0;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.40;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 2.575;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.60;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 2.94285;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.80;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 3.31071;
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.40;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 2.9842;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.60;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 3.40451;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.80;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 3.82482;
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.20;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 5.29568;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.40;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 6.17829;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.60;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval = 7.0609;
							}
						} // End
						
						if($bfval > 0 && $bmec > 0) {
							$blpec = pro_ec($bmec, $bfval);
							$bsblamt =  amt_cal($bmec,$blpec,$rsize);
						} else {
							$bsblamt = 0;
						}
						
						if($bsrtval > 0 && $bmec > 0) {
							$bsrtec = pro_ec($bmec, $bsrtval);
							$bsrtamt =  amt_cal($bmec,$bsrtec,$rsize);
						} else {
							$bsrtamt = 0;
						}
						
						if($bsgbval > 0 && $bmec > 0){
							$bsgbec = pro_ec($bmec, $bsgbval);
							$bsgbamt =  amt_cal($bmec,$bsgbec,$rsize);
						} else {
							$bsgbamt = 0;
						}
						
						if($bsbbval > 0 && $bmec > 0){
							/*if($flower == 1) {
								$bsbbval = $bsbbval * 2;
							}*/
							$bsbbec = pro_ec($bmec, $bsbbval);
							$bsbbamt =  amt_cal($bmec,$bsbbec,$rsize);
						} else {
							$bsbbamt = 0;
						}
						
						if($bsbmval > 0 && $bmec > 0){
							$bsbmec = pro_ec($bmec, $bsbmval);
							$bsbmamt =  amt_cal($bmec,$bsbmec,$rsize);
						} else {
							$bsbmamt = 0;
						}
						
						if($reservior == 2){
							$bsblamt = covt_gal($bsblamt);
							$bsrtamt = covt_gal($bsrtamt);
							$bsgbamt = covt_gal($bsgbamt);
							$bsbbamt = covt_gal($bsbbamt);
							$bsbmamt = covt_gal($bsbmamt);
						} else {
							$bsblamt = $bsblamt;
							$bsrtamt = $bsrtamt;
							$bsgbamt = $bsgbamt;
							$bsbbamt = $bsbbamt;
							$bsbmamt = $bsbmamt;
						}
						
						$mbsblamt = $bsblamt;
						$mbsrtamt = $bsrtamt;
						$mbsgbamt = $bsgbamt;
						$mbsbbamt = $bsbbamt;
						$mbsbmamt = $bsbmamt;
						
						if(isset($valhide)) {
							for($n=0; $n <= $chkcount; $n++) {
								if($valhide[$n] == 5) {
									$bsrtamt = 0;
								} else if($valhide[$n] == 6) {
									$bsgbamt = 0;
								} else if($valhide[$n] == 7) {
									$bsbmamt = 0;
								} else if($valhide[$n] == 8) {
									$bsbbamt = 0;
								}
							}
						} else {
							if($glevel == 0){
						
							} else if($glevel == 1){
								$bsbbamt = 0;
							} else if($glevel == 2){
								$bsrtamt = 0;
								if($reuse == 1) {
									$bsgbamt = $bsgbamt;
								} else {
									$bsgbamt = 0;	
								}
								//$bsgbamt = 0;
								$bsbbamt = 0;
								$bsbmamt = 0;
							}
						}
											
						if($nuts == 0) {
							$ml = '<small>oz</small>';
							
							/*if($bsblamt > 0){*/
								$bsblamt = covt_oz($bsblamt);
								$finalbsbl = number_format($bsblamt,1).$ml;
							/*} else {
								$finalbsbl = '&nbsp;';
							}*/
							
							/*if($bsrtamt > 0){*/
								$bsrtamt = covt_oz($bsrtamt);
								$finalbsrt = number_format($bsrtamt,1).$ml;
							/*} else {
								$finalbsrt = '&nbsp;';
							}*/
							
							/*if($bsgbamt > 0){*/
								$bsgbamt = covt_oz($bsgbamt);
								$finalbsgb = number_format($bsgbamt,1).$ml;
							/*} else {
								$finalbsgb = '&nbsp;';
							}*/
							
							/*if($bsbbamt > 0){*/
								$bsbbamt = covt_oz($bsbbamt);
								$finalbsbb = number_format($bsbbamt,1).$ml;
							/*} else {
								$finalbsbb = '&nbsp;';
							}*/
							
							/*if($bsbmamt > 0){*/
								$bsbmamt = covt_oz($bsbmamt);
								$finalbsbm = number_format($bsbmamt,1).$ml;
							/*} else {
								$finalbsbm = '&nbsp;';
							}*/
							
						} else {
							$ml = '<small>mL</small>';
							
							/*if($bsblamt > 0){*/
								if($rsize > 3) {
									$finalbsbl = round($bsblamt).$ml;
								} else {
									$finalbsbl = round($bsblamt,1).$ml;	
								}
							/*} else {
								$finalbsbl = '&nbsp;';
							}*/
							
							/*if($bsrtamt > 0){*/
								if($rsize > 3) {
									$finalbsrt = round($bsrtamt).$ml;
								} else {
									$finalbsrt = round($bsrtamt,1).$ml;	
								}
							/*} else {
								$finalbsrt = '&nbsp;';
							}*/
							
							/*if($bsgbamt > 0){*/
								if($rsize > 3) {
									$finalbsgb = round($bsgbamt).$ml;
								} else {
									$finalbsgb = round($bsgbamt,1).$ml;	
								}
							/*} else {
								$finalbsgb = '&nbsp;';
							}*/
							
							/*if($bsbbamt > 0){*/
								if($rsize > 3) {
									$finalbsbb = round($bsbbamt).$ml;
								} else {
									$finalbsbb = round($bsbbamt,1).$ml;	
								}
							/*} else {
								$finalbsbb = '&nbsp;';
							}*/
							
							/*if($bsbmamt > 0){*/
								if($rsize > 3) {
									$finalbsbm = round($bsbmamt).$ml;
								} else {
									$finalbsbm = round($bsbmamt,1).$ml;	
								}
							/*} else {
								$finalbsbm = '&nbsp;';
							}*/
						}
						
						$ttlbl = $ttlbl + $bsblamt;
						$ttlrt = $ttlrt + $bsrtamt;
						if($bsgbamt > 0){
							$ttlgb = $ttlgb + $bsgbamt;
						}
						if($bsbbamt > 0){
							$ttlbb = $ttlbb + $bsbbamt;
						}
						if($bsbmamt > 0){
							$ttlbm = $ttlbm + $bsbmamt;
						}
						
						if($nuts == 0) {
							$finalttlbl = $ttlbl.$ml;
							$finalttlrt = $ttlrt.$ml;
							$finalttlgb = $ttlgb.$ml;
							$finalttlbb = $ttlbb.$ml;
							$finalttlbm = $ttlbm.$ml;
						} else {
							$finalttlbl = round($ttlbl).$ml;
							$finalttlrt = round($ttlrt).$ml;
							$finalttlgb = round($ttlgb).$ml;
							$finalttlbb = round($ttlbb).$ml;
							$finalttlbm = round($ttlbm).$ml;
						}
						
						if($finalttlbl > 0) {
								
						} else {
							$finalttlbl = '&nbsp;';	
						}
						
						if($finalttlrt > 0) {
								
						} else {
							$finalttlrt = '&nbsp;';	
						}
						
						if($finalttlgb > 0) {
								
						} else {
							$finalttlgb = '&nbsp;';	
						}
						
						if($finalttlbb > 0) {
								
						} else {
							$finalttlbb = '&nbsp;';	
						}
						
						if($finalttlbm > 0) {
								
						} else {
							$finalttlbm = '&nbsp;';	
						}
						
						if($w <= 9) {
							$week_num = '0'.$w;
						} else {
							$week_num = $w;
						}
					
						$data .= '<div class="row-dv bdr-dv ft-z">
								<div class="tr-div tr-col-1">&nbsp;</div>
								<div class="tr-div tr-col-2">'.$week_num.'</div>
								<div class="tr-div tr-col-3">'.$bmec.'</div>
								<div class="tr-div tr-col-4">'.$bswthrd.'</div>
								<div class="tr-div blank-col">&nbsp;</div>
								<div class="tr-div tr-col-5">'.$finalbsbl.'</div>
								<div class="tr-div tr-col-5">'.$finalbsbl.'</div>
								<div class="tr-div tr-col-5">'.$finalbsrt.'</div>
								<div class="tr-div tr-col-5">'.$finalbsgb.'</div>
								<div class="tr-div tr-col-5">'.$finalbsbm.'</div>
								<div class="tr-div tr-col-5">'.$finalbsbb.'</div>
							</div>';
						
						/* Mobile Carousel */	
						if(isset($valhide)) {
							for($n=0; $n <= $chkcount; $n++) {
								if($valhide[$n] == 13) {
									$mbsrtamt = 0;
								} else if($valhide[$n] == 14) {
									$mbsgbamt = 0;
								} else if($valhide[$n] == 15) {
									$mbsbmamt = 0;
								} else if($valhide[$n] == 16) {
									$mbsbbamt = 0;
								}
							}
						} else {
							if($glevel == 0){
						
							} else if($glevel == 1){
								$mbsbbamt = 0;
							} else if($glevel == 2){
								$mbsrtamt = 0;
								if($reuse == 1) {
									$mbsgbamt = $mbsgbamt;
								} else {
									$mbsgbamt = 0;	
								}
								//$mbsgbamt = 0;
								$mbsbbamt = 0;
								$mbsbmamt = 0;
							}
						}
											
						if($nuts == 0) {
							$ml = '<small>oz</small>';
							
							/*if($mbsblamt > 0){*/
								$mbsblamt = covt_oz($mbsblamt);
								$mfinalbsbl = number_format($mbsblamt,1).$ml;
							/*} else {
								$mfinalbsbl = '&nbsp;';
							}*/
							
							/*if($mbsrtamt > 0){*/
								$mbsrtamt = covt_oz($mbsrtamt);
								$mfinalbsrt = number_format($mbsrtamt,1).$ml;
							/*} else {
								$mfinalbsrt = '&nbsp;';
							}*/
							
							/*if($mbsgbamt > 0){*/
								$mbsgbamt = covt_oz($mbsgbamt);
								$mfinalbsgb = number_format($mbsgbamt,1).$ml;
							/*} else {
								$mfinalbsgb = '&nbsp;';
							}*/
							
							/*if($mbsbbamt > 0){*/
								$mbsbbamt = covt_oz($mbsbbamt);
								$mfinalbsbb = number_format($mbsbbamt,1).$ml;
							/*} else {
								$mfinalbsbb = '&nbsp;';
							}*/
							
							/*if($mbsbmamt > 0){*/
								$mbsbmamt = covt_oz($mbsbmamt);
								$mfinalbsbm = number_format($mbsbmamt,1).$ml;
							/*} else {
								$mfinalbsbm = '&nbsp;';
							}*/
							
						} else {
							$ml = '<small>mL</small>';
							
							/*if($mbsblamt > 0){*/
								if($rsize > 3) {
									$mfinalbsbl = round($mbsblamt).$ml;
								} else {
									$mfinalbsbl = round($mbsblamt,1).$ml;	
								}
							/*} else {
								$mfinalbsbl = '&nbsp;';
							}*/
							
							/*if($mbsrtamt > 0){*/
								if($rsize > 3) {
									$mfinalbsrt = round($mbsrtamt).$ml;
								} else {
									$mfinalbsrt = round($mbsrtamt,1).$ml;	
								}
							/*} else {
								$mfinalbsrt = '&nbsp;';
							}*/
							
							/*if($mbsgbamt > 0){*/
								if($rsize > 3) {
									$mfinalbsgb = round($mbsgbamt).$ml;
								} else {
									$mfinalbsgb = round($mbsgbamt,1).$ml;	
								}
							/*} else {
								$mfinalbsgb = '&nbsp;';
							}*/
							
							/*if($mbsbbamt > 0){*/
								if($rsize > 3) {
									$mfinalbsbb = round($mbsbbamt).$ml;
								} else {
									$mfinalbsbb = round($mbsbbamt,1).$ml;	
								}
							/*} else {
								$mfinalbsbb = '&nbsp;';
							}*/
							
							/*if($mbsbmamt > 0){*/
								if($rsize > 3) {
									$mfinalbsbm = round($mbsbmamt).$ml;
								} else {
									$mfinalbsbm = round($mbsbmamt,1).$ml;	
								}
							/*} else {
								$mfinalbsbm = '&nbsp;';
							}*/
						}
						
						$mttlbl = $mttlbl + $mbsblamt;
						$mttlrt = $mttlrt + $mbsrtamt;
						if($mbsgbamt > 0){
							$mttlgb = $mttlgb + $mbsgbamt;
						}
						if($mbsbbamt > 0){
							$mttlbb = $mttlbb + $mbsbbamt;
						}
						if($mbsbmamt > 0){
							$mttlbm = $mttlbm + $mbsbmamt;
						}
						
						if($nuts == 0) {
							$mfinalttlbl = $mttlbl.$ml;
							$mfinalttlrt = $mttlrt.$ml;
							$mfinalttlgb = $mttlgb.$ml;
							$mfinalttlbb = $mttlbb.$ml;
							$mfinalttlbm = $mttlbm.$ml;
						} else {
							$mfinalttlbl = round($mttlbl).$ml;
							$mfinalttlrt = round($mttlrt).$ml;
							$mfinalttlgb = round($mttlgb).$ml;
							$mfinalttlbb = round($mttlbb).$ml;
							$mfinalttlbm = round($mttlbm).$ml;
						}
						
						if($mfinalttlbl > 0) {
								
						} else {
							$mfinalttlbl = '&nbsp;';	
						}
						
						if($mfinalttlrt > 0) {
								
						} else {
							$mfinalttlrt = '&nbsp;';	
						}
						
						if($mfinalttlgb > 0) {
								
						} else {
							$mfinalttlgb = '&nbsp;';	
						}
						
						if($mfinalttlbb > 0) {
								
						} else {
							$mfinalttlbb = '&nbsp;';	
						}
						
						if($mfinalttlbm > 0) {
								
						} else {
							$mfinalttlbm = '&nbsp;';	
						}
						
						$bloom_mobile_data .='<div class="item">
									<div class="stage-silde">
										<div class="stage-row"> <span>Plant Stage</span></div>
										<div class="cl"></div>
										<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img3.png"></div>
										<div class="sel-text">
											<div class="week-col"> <span class="s-stage">Bloom</span> <span>Week</span>'.$week_num.'</div>
											<div class="week-col ec-col"><ul><li><span class="s-state">EC</span>'.$bmec.'</li><li><span>EC+Water</span>'.$bswthrd.'</li></ul></div>
											<div class="week-col ec-col-new"> <span class="s-state">Bloom Food A&B</span>'.$mfinalbsbl.'</div>
											<div class="week-col ec-col-new"> <span class="s-state">Root Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-broot" value="13" '.$chked[13].' ><label for="stage-broot"></label></div></span>'.$mfinalbsrt.'</div>
											<div class="week-col ec-col-new"> <span class="s-state">Grow Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bgrow" value="14" '.$chked[14].' ><label for="stage-bgrow"></label></div></span>'.$mfinalbsgb.'</div>
											<div class="week-col ec-col-new"> <span class="s-state">Bloom Minerals <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bminerals" value="15" '.$chked[15].' ><label for="stage-bminerals"></label></div></span>'.$mfinalbsbm.'</div>
											<div class="week-col ec-col-new"> <span class="s-state">Bud Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bbud" value="16" '.$chked[16].' ><label for="stage-bbud"></label></div></span>'.$mfinalbsbb.'</div>
										</div>
									</div>
								</div>';
					}
					
					if($bweek > 6) {
						$cntweeks =  3;
						for($i = 3; $i <= $bweek-4; $i++) {
							$cntweeks ++;
							if( $i >= 3 ) { // week 3-11
								$bsrtval = 0.50000;
								$bsgbval = 2.50000;
								$bsbbval = 2.00000;
								$bsbmval = 0;
								if ($sub_type == 0) { //Subtract Type - Hydroponic
									if($flevel == 0) { // Food Level - Light
										$bmec = 1.40;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 2.575;
									} else if($flevel == 1) { // Food Level - Normal
										$bmec = 1.60;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 2.94285;
									} else if($flevel == 2) { // Food Level - High
										$bmec = 1.80;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 3.31071;
									}
								} else if($sub_type == 1) { //Subtract Type - Coco
									if($flevel == 0) { // Food Level - Light
										$bmec = 1.40;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 2.9842;
									} else if($flevel == 1) { // Food Level - Normal
										$bmec = 1.60;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 3.40451;
									} else if($flevel == 2) { // Food Level - High
										$bmec = 1.80;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 3.82482;
									}
								} else if($sub_type == 2) { //Subtract Type - Peat
									if($flevel == 0) { // Food Level - Light
										$bmec = 1.20;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 5.29568;
									} else if($flevel == 1) { // Food Level - Normal
										$bmec = 1.40;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 6.17829;
									} else if($flevel == 2) { // Food Level - High
										$bmec = 1.60;
										
										if($cond == 1) { //EC
											$bmec = $bmec;
											
										} else if($cond == 2) { //PPM Trunchoen
											$bmec = covt_ppmt($bmec);
											
										} else if($cond == 3) { //PPM Eutech
											$bmec = covt_ppme($bmec);
											
										} else if($cond == 4) { //PPM Hanna
											$bmec = covt_ppmh($bmec);
											
										} else if($cond == 5) { //CF
											$bmec = covt_cf($bmec);
											
										}
										
										$bswthrd = $bmec + $bscwater;
										$bfval = 7.0609;
									}
								}	
							}
							
							if($bfval > 0 && $bmec > 0) {
								$blpec = pro_ec($bmec, $bfval);
								$bsblamt =  amt_cal($bmec,$blpec,$rsize);
							} else {
								$bsblamt = 0;
							}
							
							if($bsrtval > 0 && $bmec > 0) {
								$bsrtec = pro_ec($bmec, $bsrtval);
								$bsrtamt =  amt_cal($bmec,$bsrtec,$rsize);
							} else {
								$bsrtamt = 0;
							}
							
							if($bsgbval > 0 && $bmec > 0){
								$bsgbec = pro_ec($bmec, $bsgbval);
								$bsgbamt =  amt_cal($bmec,$bsgbec,$rsize);
							} else {
								$bsgbamt = 0;
							}
							
							if($bsbbval > 0 && $bmec > 0){
								/*if($flower == 1) {
									$bsbbval = $bsbbval * 2;
								}*/
								$bsbbec = pro_ec($bmec, $bsbbval);
								$bsbbamt =  amt_cal($bmec,$bsbbec,$rsize);
							} else {
								$bsbbamt = 0;
							}
							
							if($bsbmval > 0 && $bmec > 0){
								$bsbmec = pro_ec($bmec, $bsbmval);
								$bsbmamt =  amt_cal($bmec,$bsbmec,$rsize);
							} else {
								$bsbmamt = 0;
							}
							
							if($reservior == 2){
								$bsblamt = covt_gal($bsblamt);
								$bsrtamt = covt_gal($bsrtamt);
								$bsgbamt = covt_gal($bsgbamt);
								$bsbbamt = covt_gal($bsbbamt);
								$bsbmamt = covt_gal($bsbmamt);
							} else {
								$bsblamt = $bsblamt;
								$bsrtamt = $bsrtamt;
								$bsgbamt = $bsgbamt;
								$bsbbamt = $bsbbamt;
								$bsbmamt = $bsbmamt;
							}
							
							$mbsblamt = $bsblamt;
							$mbsrtamt = $bsrtamt;
							$mbsgbamt = $bsgbamt;
							$mbsbbamt = $bsbbamt;
							$mbsbmamt = $bsbmamt;
								
							if(isset($valhide)) {
								for($n=0; $n <= $chkcount; $n++) {
									if($valhide[$n] == 5) {
										$bsrtamt = 0;
									} else if($valhide[$n] == 6) {
										$bsgbamt = 0;
									} else if($valhide[$n] == 7) {
										$bsbmamt = 0;
									} else if($valhide[$n] == 8) {
										$bsbbamt = 0;
									}
								}
							} else {
								if($glevel == 0){
						
								} else if($glevel == 1){
									$bsbbamt = 0;
								} else if($glevel == 2){
									$bsrtamt = 0;
									if($reuse == 1) {
										$bsgbamt = $bsgbamt;
									} else {
										$bsgbamt = 0;	
									}
									//$bsgbamt = 0;
									$bsbbamt = 0;
									$bsbmamt = 0;
								}
							}
												
							if($nuts == 0) {
								$ml = '<small>oz</small>';
								
								/*if($bsblamt > 0){*/
									$bsblamt = covt_oz($bsblamt);
									$finalbsbl = number_format($bsblamt,1).$ml;
								/*} else {
									$finalbsbl = '&nbsp;';
								}*/
								
								/*if($bsrtamt > 0){*/
									$bsrtamt = covt_oz($bsrtamt);
									$finalbsrt = number_format($bsrtamt,1).$ml;
								/*} else {
									$finalbsrt = '&nbsp;';
								}*/
								
								/*if($bsgbamt > 0){*/
									$bsgbamt = covt_oz($bsgbamt);
									$finalbsgb = number_format($bsgbamt,1).$ml;
								/*} else {
									$finalbsgb = '&nbsp;';
								}*/
								
								/*if($bsbbamt > 0){*/
									$bsbbamt = covt_oz($bsbbamt);
									$finalbsbb = number_format($bsbbamt,1).$ml;
								/*} else {
									$finalbsbb = '&nbsp;';
								}*/
								
								/*if($bsbmamt > 0){*/
									$bsbmamt = covt_oz($bsbmamt);
									$finalbsbm = number_format($bsbmamt,1).$ml;
								/*} else {
									$finalbsbm = '&nbsp;';
								}*/
								
							} else {
								$ml = '<small>mL</small>';
							
								/*if($bsblamt > 0){*/
									if($rsize > 3) {
										$finalbsbl = round($bsblamt).$ml;
									} else {
										$finalbsbl = round($bsblamt,1).$ml;	
									}
								/*} else {
									$finalbsbl = '&nbsp;';
								}*/
								
								/*if($bsrtamt > 0){*/
									if($rsize > 3) {
										$finalbsrt = round($bsrtamt).$ml;
									} else {
										$finalbsrt = round($bsrtamt,1).$ml;	
									}
								/*} else {
									$finalbsrt = '&nbsp;';
								}*/
								
								/*if($bsgbamt > 0){*/
									if($rsize > 3) {
										$finalbsgb = round($bsgbamt).$ml;
									} else {
										$finalbsgb = round($bsgbamt,1).$ml;	
									}
								/*} else {
									$finalbsgb = '&nbsp;';
								}*/
								
								/*if($bsbbamt > 0){*/
									if($rsize > 3) {
										$finalbsbb = round($bsbbamt).$ml;
									} else {
										$finalbsbb = round($bsbbamt,1).$ml;	
									}
								/*} else {
									$finalbsbb = '&nbsp;';
								}*/
								
								/*if($bsbmamt > 0){*/
									if($rsize > 3) {
										$finalbsbm = round($bsbmamt).$ml;
									} else {
										$finalbsbm = round($bsbmamt,1).$ml;	
									}
								/*} else {
									$finalbsbm = '&nbsp;';
								}*/
							}
							
							$ttlbl = $ttlbl + $bsblamt;
							$ttlrt = $ttlrt + $bsrtamt;
							if($bsgbamt > 0){
								$ttlgb = $ttlgb + $bsgbamt;
							}
							if($bsbbamt > 0){
								$ttlbb = $ttlbb + $bsbbamt;
							}
							if($bsbmamt > 0){
								$ttlbm = $ttlbm + $bsbmamt;
							}
							
							if($nuts == 0) {
								$finalttlbl = $ttlbl.$ml;
								$finalttlrt = $ttlrt.$ml;
								$finalttlgb = $ttlgb.$ml;
								$finalttlbb = $ttlbb.$ml;
								$finalttlbm = $ttlbm.$ml;
							} else {
								$finalttlbl = round($ttlbl).$ml;
								$finalttlrt = round($ttlrt).$ml;
								$finalttlgb = round($ttlgb).$ml;
								$finalttlbb = round($ttlbb).$ml;
								$finalttlbm = round($ttlbm).$ml;
							}
							
							if($finalttlbl > 0) {
									
							} else {
								$finalttlbl = '&nbsp;';	
							}
							
							if($finalttlrt > 0) {
									
							} else {
								$finalttlrt = '&nbsp;';	
							}
							
							if($finalttlgb > 0) {
									
							} else {
								$finalttlgb = '&nbsp;';	
							}
							
							if($finalttlbb > 0) {
									
							} else {
								$finalttlbb = '&nbsp;';	
							}
							
							if($finalttlbm > 0) {
									
							} else {
								$finalttlbm = '&nbsp;';	
							}
							
							if($i <= 9) {
								$week_num = '0'.$i;
							} else {
								$week_num = $i;
							}
							
							$data .= '<div class="row-dv bdr-dv ft-z">
									<div class="tr-div tr-col-1">&nbsp;</div>
									<div class="tr-div tr-col-2">'.$week_num.'</div>
									<div class="tr-div tr-col-3">'.$bmec.'</div>
									<div class="tr-div tr-col-4">'.$bswthrd.'</div>
									<div class="tr-div blank-col">&nbsp;</div>
									<div class="tr-div tr-col-5">'.$finalbsbl.'</div>
									<div class="tr-div tr-col-5">'.$finalbsbl.'</div>
									<div class="tr-div tr-col-5">'.$finalbsrt.'</div>
									<div class="tr-div tr-col-5">'.$finalbsgb.'</div>
									<div class="tr-div tr-col-5">'.$finalbsbm.'</div>
									<div class="tr-div tr-col-5">'.$finalbsbb.'</div>
								</div>';
							
						/* Mobile Carousel */	
						if(isset($valhide)) {
							for($n=0; $n <= $chkcount; $n++) {
								if($valhide[$n] == 13) {
									$mbsrtamt = 0;
								} else if($valhide[$n] == 14) {
									$mbsgbamt = 0;
								} else if($valhide[$n] == 15) {
									$mbsbmamt = 0;
								} else if($valhide[$n] == 16) {
									$mbsbbamt = 0;
								}
							}
						} else {
							if($glevel == 0){
						
							} else if($glevel == 1){
								$mbsbbamt = 0;
							} else if($glevel == 2){
								$mbsrtamt = 0;
								if($reuse == 1) {
									$mbsgbamt = $mbsgbamt;
								} else {
									$mbsgbamt = 0;	
								}
								//$mbsgbamt = 0;
								$mbsbbamt = 0;
								$mbsbmamt = 0;
							}
						}
											
						if($nuts == 0) {
							$ml = '<small>oz</small>';
							
							/*if($mbsblamt > 0){*/
								$mbsblamt = covt_oz($mbsblamt);
								$mfinalbsbl = number_format($mbsblamt,1).$ml;
							/*} else {
								$mfinalbsbl = '&nbsp;';
							}*/
							
							/*if($mbsrtamt > 0){*/
								$mbsrtamt = covt_oz($mbsrtamt);
								$mfinalbsrt = number_format($mbsrtamt,1).$ml;
							/*} else {
								$mfinalbsrt = '&nbsp;';
							}*/
							
							/*if($mbsgbamt > 0){*/
								$mbsgbamt = covt_oz($mbsgbamt);
								$mfinalbsgb = number_format($mbsgbamt,1).$ml;
							/*} else {
								$mfinalbsgb = '&nbsp;';
							}*/
							
							/*if($mbsbbamt > 0){*/
								$mbsbbamt = covt_oz($mbsbbamt);
								$mfinalbsbb = number_format($mbsbbamt,1).$ml;
							/*} else {
								$mfinalbsbb = '&nbsp;';
							}*/
							
							/*if($mbsbmamt > 0){*/
								$mbsbmamt = covt_oz($mbsbmamt);
								$mfinalbsbm = number_format($mbsbmamt,1).$ml;
							/*} else {
								$mfinalbsbm = '&nbsp;';
							}*/
							
						} else {
							$ml = '<small>mL</small>';
							
							/*if($mbsblamt > 0){*/
								if($rsize > 3) {
									$mfinalbsbl = round($mbsblamt).$ml;
								} else {
									$mfinalbsbl = round($mbsblamt,1).$ml;	
								}
							/*} else {
								$mfinalbsbl = '&nbsp;';
							}*/
							
							/*if($mbsrtamt > 0){*/
								if($rsize > 3) {
									$mfinalbsrt = round($mbsrtamt).$ml;
								} else {
									$mfinalbsrt = round($mbsrtamt,1).$ml;	
								}
							/*} else {
								$mfinalbsrt = '&nbsp;';
							}*/
							
							/*if($mbsgbamt > 0){*/
								if($rsize > 3) {
									$mfinalbsgb = round($mbsgbamt).$ml;
								} else {
									$mfinalbsgb = round($mbsgbamt,1).$ml;	
								}
							/*} else {
								$mfinalbsgb = '&nbsp;';
							}*/
							
							/*if($mbsbbamt > 0){*/
								if($rsize > 3) {
									$mfinalbsbb = round($mbsbbamt).$ml;
								} else {
									$mfinalbsbb = round($mbsbbamt,1).$ml;	
								}
							/*} else {
								$finalbsbb = '&nbsp;';
							}*/
							
							/*if($mbsbmamt > 0){*/
								if($rsize > 3) {
									$mfinalbsbm = round($mbsbmamt).$ml;
								} else {
									$mfinalbsbm = round($mbsbmamt,1).$ml;	
								}
							/*} else {
								$mfinalbsbm = '&nbsp;';
							}*/
						}
						
						$mttlbl = $mttlbl + $mbsblamt;
						$mttlrt = $mttlrt + $mbsrtamt;
						if($mbsgbamt > 0){
							$mttlgb = $mttlgb + $mbsgbamt;
						}
						if($mbsbbamt > 0){
							$mttlbb = $mttlbb + $mbsbbamt;
						}
						if($mbsbmamt > 0){
							$mttlbm = $mttlbm + $mbsbmamt;
						}
						
						if($nuts == 0) {
							$mfinalttlbl = $mttlbl.$ml;
							$mfinalttlrt = $mttlrt.$ml;
							$mfinalttlgb = $mttlgb.$ml;
							$mfinalttlbb = $mttlbb.$ml;
							$mfinalttlbm = $mttlbm.$ml;
						} else {
							$mfinalttlbl = round($mttlbl).$ml;
							$mfinalttlrt = round($mttlrt).$ml;
							$mfinalttlgb = round($mttlgb).$ml;
							$mfinalttlbb = round($mttlbb).$ml;
							$mfinalttlbm = round($mttlbm).$ml;
						}
						
						if($mfinalttlbl > 0) {
								
						} else {
							$mfinalttlbl = '&nbsp;';	
						}
						
						if($mfinalttlrt > 0) {
								
						} else {
							$mfinalttlrt = '&nbsp;';	
						}
						
						if($mfinalttlgb > 0) {
								
						} else {
							$mfinalttlgb = '&nbsp;';	
						}
						
						if($mfinalttlbb > 0) {
								
						} else {
							$mfinalttlbb = '&nbsp;';	
						}
						
						if($mfinalttlbm > 0) {
								
						} else {
							$mfinalttlbm = '&nbsp;';	
						}
						
							$bloom_mobile_data .='<div class="item">
										<div class="stage-silde">
											<div class="stage-row"> <span>Plant Stage</span></div>
											<div class="cl"></div>
											<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img3.png"></div>
											<div class="sel-text">
												<div class="week-col"> <span class="s-stage">Bloom</span><span>Week</span>'.$week_num.'</div>
												<div class="week-col ec-col"><ul><li><span class="s-state">EC</span>'.$bmec.'</li><li><span>EC+Water</span>'.$bswthrd.'</li></ul></div>
												<div class="week-col ec-col-new"> <span class="s-state">Bloom Food A&B</span>'.$mfinalbsbl.'</div>
												<div class="week-col ec-col-new"> <span class="s-state">Root Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-broot" value="13" '.$chked[13].' ><label for="stage-broot"></label></div></span>'.$mfinalbsrt.'</div>
												<div class="week-col ec-col-new"> <span class="s-state">Grow Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bgrow" value="14" '.$chked[14].' ><label for="stage-bgrow"></label></div></span>'.$mfinalbsgb.'</div>
												<div class="week-col ec-col-new"> <span class="s-state">Bloom Minerals <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bminerals" value="15" '.$chked[15].' ><label for="stage-bminerals"></label></div></span>'.$mfinalbsbm.'</div>
												<div class="week-col ec-col-new"> <span class="s-state">Bud Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bbud" value="16" '.$chked[16].' ><label for="stage-bbud"></label></div></span>'.$mfinalbsbb.'</div>
											</div>
										</div>
									</div>';	
							
						}
					}
				
				if(isset($cntweeks) && $cntweeks > 0) {
					$cw = $cntweeks;	
				} else {
					$cw = 0;	
				}
				
				for($lw = 3; $lw <= 6; $lw++) { // week 12-15
					if($cw == 0){
						$cw = $lw;
					} else {
						
					}
					if( $lw == 3 ) { // week 12
						$bsrtval = 0.50000;
						$bsgbval = 2.50000;
						$bsbbval = 2.00000;
						$bsbmval = 1.50000;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.50;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   1.93125;
								} else {
									$bfval =   2.758921875;
								}
								
								if($flower == 1) {
									$bsbmval = 5.00000;
								} else {
									$bsbmval = 1.50000;
								}
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.70;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									

								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.29911;
								} else {
									$bfval =    3.126778125;
								}
								
								if($flower == 1) {
									$bsbmval = 5.66667;
								} else {
									$bsbmval = 1.50000;
								}
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.90;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.66697;
								} else {
									$bfval =   3.494634375;
								}
								
								if($flower == 1) {
									$bsbmval = 6.33333;
								} else {
									$bsbmval = 1.50000;
								}
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.60;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.11518;
								} else {
									$bfval =   2.94285;
								}
								
								if($flower == 1) {
									$bsbmval = 5.33333;
								} else {
									$bsbmval = 1.50000;
								}
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.80;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.48304;
								} else {
									$bfval =   3.31070625;
								}
								
								if($flower == 1) {
									$bsbmval = 6.00000;
								} else {
									$bsbmval = 1.50000;
								}
							} else if($flevel == 2) { // Food Level - High
								$bmec = 2.00;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.85090;
								} else {
									$bfval =   3.6785625;
								}
								
								if($flower == 1) {
									$bsbmval = 6.66667;
								} else {
									$bsbmval = 1.50000;
								}
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.50;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   1.93125;
								} else {
									$bfval =   2.758921875;
								}
								
								if($flower == 1) {
									$bsbmval = 5.00000;
								} else {
									$bsbmval = 1.50000;
								}
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.70;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);	
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.29911;
								} else {
									$bfval =   3.126778125;
								}
								
								if($flower == 1) {
									$bsbmval = 5.66667;
								} else {
									$bsbmval = 1.50000;
								}
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.90;
								
								if($cond == 1) { //EC
									$bmec = $bmec;	
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
								}
								
								$bswthrd = $bmec + $bscwater;
								if($bmineralchk == 1) {
									$bfval =   2.66697;
								} else {
									$bfval =   3.494634375;
								}
								
								if($flower == 1) {
									$bsbmval = 6.33333;
								} else {
									$bsbmval = 1.50000;
								}
							}
						}
						if($bmineralchk == 1 && $flower == 1) {
							$bfval = 0.0000;
						}
					}
					
					if( $lw > 3 && $lw < 6 ) { // week 13-14
						$bsrtval = 0.50000;
						$bsgbval = 2.50000;
						$bsbbval = 2.00000;
						$bsbmval = 0;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.00;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   1.83928;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.20;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   2.20714;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.40;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   2.57500;
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.00;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   2.08053;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.20;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   2.50084;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.40;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   2.92115;
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$bmec = 1.00;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   4.41306;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 1.20;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   5.29568;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 1.40;
								
								if($cond == 1) { //EC
									$bmec = $bmec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   6.17829;
							}
						}	
					}
					
					if( $lw == 6 ) { // week 15
						$bsrtval = 0;
						$bsgbval = 2.50000;
						$bsbbval = 2.00000;
						$bsbmval = 0;
						if ($sub_type == 0) { //Subtract Type - Hydroponic
							if($flevel == 0) { // Food Level - Light
								$bmec = 0;
								$exec = 1.00;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 0;
								$exec = 1.20;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 0;
								$exec = 1.40;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							}
						} else if($sub_type == 1) { //Subtract Type - Coco
							if($flevel == 0) { // Food Level - Light
								$bmec = 0;
								$exec = 1.00;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 0;
								$exec = 1.20;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 0;
								$exec = 1.40;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							}
						} else if($sub_type == 2) { //Subtract Type - Peat
							if($flevel == 0) { // Food Level - Light
								$bmec = 0;
								$exec = 1.00;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							} else if($flevel == 1) { // Food Level - Normal
								$bmec = 0;
								$exec = 1.20;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							} else if($flevel == 2) { // Food Level - High
								$bmec = 0;
								$exec = 1.40;
								if($cond == 1) { //EC
									$bmec = $bmec;
									$exec = $exec;
									
								} else if($cond == 2) { //PPM Trunchoen
									$bmec = covt_ppmt($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 3) { //PPM Eutech
									$bmec = covt_ppme($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 4) { //PPM Hanna
									$bmec = covt_ppmh($bmec);
									$exec = covt_ppmt($exec);
									
								} else if($cond == 5) { //CF
									$bmec = covt_cf($bmec);
									$exec = covt_ppmt($exec);
									
								}
								
								$bswthrd = $bmec + $bscwater;
								$bfval =   0;
							}
						}	
					}
					
					if($bfval > 0 && $bmec > 0) {
						$blpec = pro_ec($bmec, $bfval);
						$bsblamt =  amt_cal($bmec,$blpec,$rsize);
					} else {
						$bsblamt = 0;
					}
					
					if($bsrtval > 0 && $bmec > 0) {
						$bsrtec = pro_ec($bmec, $bsrtval);
						$bsrtamt =  amt_cal($bmec,$bsrtec,$rsize);
					} else {
						$bsrtamt = 0;
					}
					
					if($bsgbval > 0 && $bmec > 0){
						$bsgbec = pro_ec($bmec, $bsgbval);
						$bsgbamt =  amt_cal($bmec,$bsgbec,$rsize);
					} else if($bsgbval > 0 && $exec > 0) { 
						$bsgbec = pro_ec($exec, $bsgbval);
						$bsgbamt =  amt_cal($exec,$bsgbec,$rsize);
						/*if($reuse == 1) {
							$bsgbamt =  $bsgbamt * 2;	
						}*/
					} else {
						$bsgbamt = 0;
					}
					
					if($reuse == 1) { $bsgbamt =  $bsgbamt * 2;	}
					
					if($bsbbval > 0 && $bmec > 0){
						/*if($flower == 1) {
							$bsbbval = $bsbbval * 2;
						}*/
						$bsbbec = pro_ec($bmec, $bsbbval);
						$bsbbamt =  amt_cal($bmec,$bsbbec,$rsize);
					} else if($bsbbval > 0 && $exec > 0) {
						/*if($flower == 1) {
							$bsbbval = $bsbbval * 2;
						}*/
						$bsbbec = pro_ec($exec, $bsbbval);
						$bsbbamt =  amt_cal($exec,$bsbbec,$rsize);
					} else {
						$bsbbamt = 0;
					}
					
					if($bsbmval > 0 && $bmec > 0){
						$bsbmec = pro_ec($bmec, $bsbmval);
						$bsbmamt =  amt_cal($bmec,$bsbmec,$rsize);
					} else {
						$bsbmamt = 0;
					}
					
					if($reservior == 2){
						$bsblamt = covt_gal($bsblamt);
						$bsrtamt = covt_gal($bsrtamt);
						$bsgbamt = covt_gal($bsgbamt);
						$bsbbamt = covt_gal($bsbbamt);
						$bsbmamt = covt_gal($bsbmamt);
					} else {
						$bsblamt = $bsblamt;
						$bsrtamt = $bsrtamt;
						$bsgbamt = $bsgbamt;
						$bsbbamt = $bsbbamt;
						$bsbmamt = $bsbmamt;
					}
					
					$mbsblamt = $bsblamt;
					$mbsrtamt = $bsrtamt;
					$mbsgbamt = $bsgbamt;
					$mbsbbamt = $bsbbamt;
					$mbsbmamt = $bsbmamt;
					
					if(isset($valhide)) {
						for($n=0; $n <= $chkcount; $n++) {
							if($valhide[$n] == 5) {
								$bsrtamt = 0;
							} else if($valhide[$n] == 6) {
								$bsgbamt = 0;
							} else if($valhide[$n] == 7) {
								$bsbmamt = 0;
							} else if($valhide[$n] == 8) {
								$bsbbamt = 0;
							}
						}
					} else {
						if($glevel == 0){
							
						} else if($glevel == 1){
							$bsbbamt = 0;
						} else if($glevel == 2){
							$bsrtamt = 0;
							if($reuse == 1) {
								$bsgbamt = $bsgbamt;
							} else {
								$bsgbamt = 0;	
							}
							//$bsgbamt = 0;
							$bsbbamt = 0;
							$bsbmamt = 0;
						}	
					}
										
					if($nuts == 0) {
						$ml = '<small>oz</small>';
						
						/*if($bsblamt > 0){*/
							$bsblamt = covt_oz($bsblamt);
							$finalbsbl = number_format($bsblamt,1).$ml;
						/*} else {
							$finalbsbl = '&nbsp;';
						}*/
						
						/*if($bsrtamt > 0){*/
							$bsrtamt = covt_oz($bsrtamt);
							$finalbsrt = number_format($bsrtamt,1).$ml;
						/*} else {
							$finalbsrt = '&nbsp;';
						}*/
						
						/*if($bsgbamt > 0){*/
							$bsgbamt = covt_oz($bsgbamt);
							$finalbsgb = number_format($bsgbamt,1).$ml;
						/*} else {
							$finalbsgb = '&nbsp;';
						}*/
						
						/*if($bsbbamt > 0){*/
							$bsbbamt = covt_oz($bsbbamt);
							$finalbsbb = number_format($bsbbamt,1).$ml;
						/*} else {
							$finalbsbb = '&nbsp;';
						}*/
						
						/*if($bsbmamt > 0){*/
							$bsbmamt = covt_oz($bsbmamt);
							$finalbsbm = number_format($bsbmamt,1).$ml;
						/*} else {
							$finalbsbm = '&nbsp;';
						}*/
						
					} else {
						$ml = '<small>mL</small>';
							
						/*if($bsblamt > 0){*/
							if($rsize > 3) {
								$finalbsbl = round($bsblamt).$ml;
							} else {
								$finalbsbl = round($bsblamt,1).$ml;	
							}
						/*} else {
							$finalbsbl = '&nbsp;';
						}*/
						
						/*if($bsrtamt > 0){*/
							if($rsize > 3) {
								$finalbsrt = round($bsrtamt).$ml;
							} else {
								$finalbsrt = round($bsrtamt,1).$ml;	
							}
						/*} else {
							$finalbsrt = '&nbsp;';
						}*/
						
						/*if($bsgbamt > 0){*/
							if($rsize > 3) {
								$finalbsgb = round($bsgbamt).$ml;
							} else {
								$finalbsgb = round($bsgbamt,1).$ml;	
							}
						/*} else {
							$finalbsgb = '&nbsp;';
						}*/
						
						/*if($bsbbamt > 0){*/
							if($rsize > 3) {
								$finalbsbb = round($bsbbamt).$ml;
							} else {
								$finalbsbb = round($bsbbamt,1).$ml;	
							}
						/*} else {
							$finalbsbb = '&nbsp;';
						}*/
						
						/*if($bsbmamt > 0){*/
							if($rsize > 3) {
								$finalbsbm = round($bsbmamt).$ml;
							} else {
								$finalbsbm = round($bsbmamt,1).$ml;	
							}
						/*} else {
							$finalbsbm = '&nbsp;';
						}*/
					}
					
					$ttlbl = $ttlbl + $bsblamt;
					$ttlrt = $ttlrt + $bsrtamt;
					if($bsgbamt > 0){
						$ttlgb = $ttlgb + $bsgbamt;
					}
					if($bsbbamt > 0){
						$ttlbb = $ttlbb + $bsbbamt;
					}
					if($bsbmamt > 0){
						$ttlbm = $ttlbm + $bsbmamt;
					}
					
					if($nuts == 0) {
						$finalttlbl = $ttlbl.$ml;
						$finalttlrt = $ttlrt.$ml;
						$finalttlgb = $ttlgb.$ml;
						$finalttlbb = $ttlbb.$ml;
						$finalttlbm = $ttlbm.$ml;
					} else {
						$finalttlbl = round($ttlbl).$ml;
						$finalttlrt = round($ttlrt).$ml;
						$finalttlgb = round($ttlgb).$ml;
						$finalttlbb = round($ttlbb).$ml;
						$finalttlbm = round($ttlbm).$ml;
					}
					
					/*if($finalttlbl > 0) {
							
					} else {
						$finalttlbl = '&nbsp;';	
					}
					
					if($finalttlrt > 0) {
							
					} else {
						$finalttlrt = '&nbsp;';	
					}
					
					if($finalttlgb > 0) {
							
					} else {
						$finalttlgb = '&nbsp;';	
					}
					
					if($finalttlbb > 0) {
							
					} else {
						$finalttlbb = '&nbsp;';	
					}
					
					if($finalttlbm > 0) {
							
					} else {
						$finalttlbm = '&nbsp;';	
					}*/
					
					if($bmec > 0) {
							
					} else {
						$bmec = '&nbsp;';	
					}
					
					if($bswthrd > 0) {
							
					} else {
						$bswthrd = '&nbsp;';	
					}
					
					
					if($cw <= 9) {
						$week_num = '0'.$cw;
					} else {
						$week_num = $cw;
					}
					
					$data .= '<div class="row-dv bdr-dv ft-z">
							<div class="tr-div tr-col-1">&nbsp;</div>
							<div class="tr-div tr-col-2">'.$week_num.'</div>
							<div class="tr-div tr-col-3">'.$bmec.'</div>
							<div class="tr-div tr-col-4">'.$bswthrd.'</div>
							<div class="tr-div blank-col">&nbsp;</div>
							<div class="tr-div tr-col-5">'.$finalbsbl.'</div>
							<div class="tr-div tr-col-5">'.$finalbsbl.'</div>
							<div class="tr-div tr-col-5">'.$finalbsrt.'</div>
							<div class="tr-div tr-col-5">'.$finalbsgb.'</div>
							<div class="tr-div tr-col-5">'.$finalbsbm.'</div>
							<div class="tr-div tr-col-5">'.$finalbsbb.'</div>
						</div>';
					
					/* Mobile Carousel */	
					if(isset($valhide)) {
						for($n=0; $n <= $chkcount; $n++) {
							if($valhide[$n] == 13) {
								$mbsrtamt = 0;
							} else if($valhide[$n] == 14) {
								$mbsgbamt = 0;
							} else if($valhide[$n] == 15) {
								$mbsbmamt = 0;
							} else if($valhide[$n] == 16) {
								$mbsbbamt = 0;
							}
						}
					} else {
						if($glevel == 0){
					
						} else if($glevel == 1){
							$mbsbbamt = 0;
						} else if($glevel == 2){
							$mbsrtamt = 0;
							if($reuse == 1) {
								$mbsgbamt = $mbsgbamt;
							} else {
								$mbsgbamt = 0;	
							}
							//$mbsgbamt = 0;
							$mbsbbamt = 0;
							$mbsbmamt = 0;
						}
					}
										
					if($nuts == 0) {
						$ml = '<small>oz</small>';
						
						/*if($mbsblamt > 0){*/
							$mbsblamt = covt_oz($mbsblamt);
							$mfinalbsbl = number_format($mbsblamt,1).$ml;
						/*} else {
							$mfinalbsbl = '&nbsp;';
						}*/
						
						/*if($mbsrtamt > 0){*/
							$mbsrtamt = covt_oz($mbsrtamt);
							$mfinalbsrt = number_format($mbsrtamt,1).$ml;
						/*} else {
							$mfinalbsrt = '&nbsp;';
						}*/
						
						/*if($mbsgbamt > 0){*/
							$mbsgbamt = covt_oz($mbsgbamt);
							$mfinalbsgb = number_format($mbsgbamt,1).$ml;
						/*} else {
							$mfinalbsgb = '&nbsp;';
						}*/
						
						/*if($mbsbbamt > 0){*/
							$mbsbbamt = covt_oz($mbsbbamt);
							$mfinalbsbb = number_format($mbsbbamt,1).$ml;
						/*} else {
							$mfinalbsbb = '&nbsp;';
						}*/
						
						/*if($mbsbmamt > 0){*/
							$mbsbmamt = covt_oz($mbsbmamt);
							$mfinalbsbm = number_format($mbsbmamt,1).$ml;
						/*} else {
							$mfinalbsbm = '&nbsp;';
						}*/
						
					} else {
						$ml = '<small>mL</small>';
							
						/*if($mbsblamt > 0){*/
							if($rsize > 3) {
								$mfinalbsbl = round($mbsblamt).$ml;
							} else {
								$mfinalbsbl = round($mbsblamt,1).$ml;	
							}
						/*} else {
							$mfinalbsbl = '&nbsp;';
						}*/
						
						/*if($mbsrtamt > 0){*/
							if($rsize > 3) {
								$mfinalbsrt = round($mbsrtamt).$ml;
							} else {
								$mfinalbsrt = round($mbsrtamt,1).$ml;	
							}
						/*} else {
							$mfinalbsrt = '&nbsp;';
						}*/
						
						/*if($mbsgbamt > 0){*/
							if($rsize > 3) {
								$mfinalbsgb = round($mbsgbamt).$ml;
							} else {
								$mfinalbsgb = round($mbsgbamt,1).$ml;	
							}
						/*} else {
							$mfinalbsgb = '&nbsp;';
						}*/
						
						/*if($mbsbbamt > 0){*/
							if($rsize > 3) {
								$mfinalbsbb = round($mbsbbamt).$ml;
							} else {
								$mfinalbsbb = round($mbsbbamt,1).$ml;	
							}
						/*} else {
							$mfinalbsbb = '&nbsp;';
						}*/
						
						/*if($mbsbmamt > 0){*/
							if($rsize > 3) {
								$mfinalbsbm = round($mbsbmamt).$ml;
							} else {
								$mfinalbsbm = round($mbsbmamt,1).$ml;	
							}
						/*} else {
							$mfinalbsbm = '&nbsp;';
						}*/
					}
					
					$mttlbl = $mttlbl + $mbsblamt;
					$mttlrt = $mttlrt + $mbsrtamt;
					if($mbsgbamt > 0){
						$mttlgb = $mttlgb + $mbsgbamt;
					}
					if($mbsbbamt > 0){
						$mttlbb = $mttlbb + $mbsbbamt;
					}
					if($mbsbmamt > 0){
						$mttlbm = $mttlbm + $mbsbmamt;
					}
					
					if($nuts == 0) {
						$mfinalttlbl = $mttlbl.$ml;
						$mfinalttlrt = $mttlrt.$ml;
						$mfinalttlgb = $mttlgb.$ml;
						$mfinalttlbb = $mttlbb.$ml;
						$mfinalttlbm = $mttlbm.$ml;
					} else {
						$mfinalttlbl = round($mttlbl).$ml;
						$mfinalttlrt = round($mttlrt).$ml;
						$mfinalttlgb = round($mttlgb).$ml;
						$mfinalttlbb = round($mttlbb).$ml;
						$mfinalttlbm = round($mttlbm).$ml;
					}
					
					/*if($mfinalttlbl > 0) {
							
					} else {
						$mfinalttlbl = '&nbsp;';	
					}
					
					if($mfinalttlrt > 0) {
							
					} else {
						$mfinalttlrt = '&nbsp;';	
					}
					
					if($mfinalttlgb > 0) {
							
					} else {
						$mfinalttlgb = '&nbsp;';	
					}
					
					if($mfinalttlbb > 0) {
							
					} else {
						$mfinalttlbb = '&nbsp;';	
					}
					
					if($mfinalttlbm > 0) {
							
					} else {
						$mfinalttlbm = '&nbsp;';	
					}*/
						
					$bloom_mobile_data .='<div class="item">
								<div class="stage-silde">
									<div class="stage-row"> <span>Plant Stage</span></div>
									<div class="cl"></div>
									<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img3.png"></div>
									<div class="sel-text">
										<div class="week-col"> <span class="s-stage">Bloom</span><span>Week</span>'.$week_num.'</div>
										<div class="week-col ec-col"><ul><li><span class="s-state">EC</span>'.$bmec.'</li><li><span>EC+Water</span>'.$bswthrd.'</li></ul></div>
										<div class="week-col ec-col-new"> <span class="s-state">Bloom Food A&B</span>'.$mfinalbsbl.'</div>
										<div class="week-col ec-col-new"> <span class="s-state">Root Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-broot" value="13" '.$chked[13].' ><label for="stage-broot"></label></div></span>'.$mfinalbsrt.'</div>
										<div class="week-col ec-col-new"> <span class="s-state">Grow Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bgrow" value="14" '.$chked[14].' ><label for="stage-broot"></label></div></span>'.$mfinalbsgb.'</div>
										<div class="week-col ec-col-new"> <span class="s-state">Bloom Minerals <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bminerals" value="15" '.$chked[15].' ><label for="stage-broot"></label></div></span>'.$mfinalbsbm.'</div>
										<div class="week-col ec-col-new"> <span class="s-state">Bud Booster <div class="chk-fix"><input type="checkbox" name="radiohide[]" id="stage-bbud" value="16" '.$chked[16].' ><label for="stage-broot"></label></div></span>'.$mfinalbsbb.'</div>
									</div>
								</div>
							</div>';
					$cw ++;
				}
				$data .='<div class="row-dv total-dv bdr-dv ft-z">
							<div class="tr-div tr-col-1">&nbsp;</div>
							<div class="tr-div tr-col-2 tal-dv">Total</div>
					
							<div class="tr-div blank-col">&nbsp;</div>
							<div class="tr-div tr-col-5">'.$finalttlbl.'</div>
							<div class="tr-div tr-col-5">'.$finalttlbl.'</div>
							<div class="tr-div tr-col-5">'.$finalttlrt.'</div>
							<div class="tr-div tr-col-5">'.$finalttlgb.'</div>
							<div class="tr-div tr-col-5">'.$finalttlbm.'</div>
							<div class="tr-div tr-col-5">'.$finalttlbb.'</div>
						</div>
					</div>
				</div>
			</div>';
            /* END OF Bloom Stage Calculation */
			
			$qtygr = $totgr;
			$qtybl = $ttlbl;
			$qtyrt = $totrt + $ttlrt;
			$qtygb = $totgb + $ttlgb;
			$qtybb = $totbb + $ttlbb;
			$qtybm = $totbm + $ttlbm;
			
			/* Mobile */
			$mqtygr = $mtotgr;
			$mqtybl = $mttlbl;
			$mqtyrt = $mtotrt + $mttlrt;
			$mqtygb = $mtotgb + $mttlgb;
			$mqtybb = $mtotbb + $mttlbb;
			$mqtybm = $mtotbm + $mttlbm;
			/* ---  */
			
			if($glevel == 0) {
				$lt = 1;
				$pricegr = 44.30;
				$pricebl = 44.30;
				$pricert = 100.10;
				$pricegb = 52.95;
				$pricebm = 41.77;
				$pricebb = 168.35;
			} else if($glevel == 1) {
				$lt = 5;
				$pricegr = 130.03;
				$pricebl = 130.03;
				$pricert = 412.10;
				$pricegb = 220.23;
				$pricebm = 162.92;
				$pricebb = 670.78;
			} else if($glevel == 2) {
				$lt = 20;
				$pricegr = 452.55;
				$pricebl = 497.43;
				$pricert = 795.05;
				$pricegb = 415.63;
				$pricebm = 306.88;
				$pricebb = 670.78;
			}
			
			
			$cqtygr = covt_mltolit($qtygr,$lt);
			$cqtybl = covt_mltolit($qtybl,$lt);
			$cqtyrt = covt_mltolit($qtyrt,$lt);
			$cqtygb = covt_mltolit($qtygb,$lt);
			$cqtybb = covt_mltolit($qtybb,$lt);
			$cqtybm = covt_mltolit($qtybm,$lt);
			
			/* Mobile Price */
			$mcqtygr = covt_mltolit($mqtygr,$lt);
			$mcqtybl = covt_mltolit($mqtybl,$lt);
			$mcqtyrt = covt_mltolit($mqtyrt,$lt);
			$mcqtygb = covt_mltolit($mqtygb,$lt);
			$mcqtybb = covt_mltolit($mqtybb,$lt);
			$mcqtybm = covt_mltolit($mqtybm,$lt);
			/* ---  */
			
			$fpricegr = price_cal($cqtygr,$pricegr);
			$fpricebl = price_cal($cqtybl,$pricebl);
			$fpricert = price_cal($cqtyrt,$pricert);
			$fpricegb = price_cal($cqtygb,$pricegb);
			$fpricebb = price_cal($cqtybb,$pricebb);
			$fpricebm = price_cal($cqtybm,$pricebm);
			
			$ttlest = $fpricegr + $fpricebl + $fpricert + $fpricegb + $fpricebm + $fpricebb;
			
			$percgr = perc_cal($ttlest,$fpricegr);
			$percbl = perc_cal($ttlest,$fpricebl);
			$percrt = perc_cal($ttlest,$fpricert);
			$percgb = perc_cal($ttlest,$fpricegb);
			$percbm = perc_cal($ttlest,$fpricebm);
			if($percbm < 1) $percbm = 1;
			$percbb = perc_cal($ttlest,$fpricebb);
			
			
			/* Mobile Price */
			$mfpricegr = price_cal($mcqtygr,$pricegr);
			$mfpricebl = price_cal($mcqtybl,$pricebl);
			$mfpricert = price_cal($mcqtyrt,$pricert);
			$mfpricegb = price_cal($mcqtygb,$pricegb);
			$mfpricebb = price_cal($mcqtybb,$pricebb);
			$mfpricebm = price_cal($mcqtybm,$pricebm);
			
			$mttlest = $mfpricegr + $mfpricebl + $mfpricert + $mfpricegb + $mfpricebm + $mfpricebb;
			
			$mpercgr = perc_cal($mttlest,$mfpricegr);
			$mpercbl = perc_cal($mttlest,$mfpricebl);
			$mpercrt = perc_cal($mttlest,$mfpricert);
			$mpercgb = perc_cal($mttlest,$mfpricegb);
			$mpercbm = perc_cal($mttlest,$mfpricebm);
			if($mpercbm < 1) $mpercbm = 1;
			$mpercbb = perc_cal($mttlest,$mfpricebb);
			/* ---  */
			
			$data .='<div class="stage-full-dv">
				<article>
					<h2>Cost of Grow</h2>
					<p>What is your investment </p>
				</article>';
			if ($qtygr > 0)	 {
			$data .='<div class="cost-col">
					<h3>Grow Food A & B</h3>
					<div class="cost-dv gr-img"> <img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-GrowAB.png"> </div>
					<div class="cost-dv"> <span>Quantity</span>'.round($qtygr).$ml.'</div>
					<div class="cost-dv"> <span>Cost</span>$'.$fpricegr.'</div>
					<div class="cost-dv"> <span>Percentage</span>'.floor($percgr).'%</div>
				</div>';
				
			$cost_mobile_data .='<div class="item">
						<div class="stage-silde">
							<div class="stage-row"> <span class="c-bg">Cost Of Grow Food A&B</span> <span>&nbsp;</span> </div>
							<div class="cl"></div>
							<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
							<div class="sel-text">
								<div class="week-col pro-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-GrowAB.png"><span>Grow Food A&B</span></div>
								<div class="week-col ec-col-new"> <span class="s-state">Quantity</span>'.round($mqtygr).$ml.'</div>
								<div class="week-col ec-col-new"> <span class="s-state">Cost</span>$'.$mfpricegr.'</div>
								<div class="week-col ec-col-new"> <span class="s-state">Percentage</span>'.floor($mpercgr).'%</div>
							</div>
						</div>
					</div>';
			}
			
			if ($qtybl > 0)	 {
			$data .='<div class="cost-col">
					<h3>Bloom Food  A & B</h3>
					<div class="cost-dv gr-img"> <img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-BloomAB.png"> </div>
					<div class="cost-dv"> <span>Quantity</span>'.round($qtybl).$ml.'</div>
					<div class="cost-dv"> <span>Cost</span>$'.$fpricebl.'</div>
					<div class="cost-dv"> <span>Percentage</span>'.floor($percbl).'%</div>
				</div>';
				
			$cost_mobile_data .='<div class="item">
						<div class="stage-silde">
							<div class="stage-row"> <span class="c-bg">Cost Of Bloom Food  A & B</span> <span>&nbsp;</span> </div>
							<div class="cl"></div>
							<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
							<div class="sel-text">
								<div class="week-col pro-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-BloomAB.png"><span>Bloom Food A&B</span></div>
								<div class="week-col ec-col-new"> <span class="s-state">Quantity</span>'.round($mqtybl).$ml.'</div>
								<div class="week-col ec-col-new"> <span class="s-state">Cost</span>$'.$mfpricebl.'</div>
								<div class="week-col ec-col-new"> <span class="s-state">Percentage</span>'.floor($mpercbl).'%</div>
							</div>
						</div>
					</div>';
			}
			
			if ($qtyrt > 0)	 {
			$data .='<div class="cost-col">
					<h3>Root Booster</h3>
					<div class="cost-dv gr-img"> <img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-RootAB.png"> </div>
					<div class="cost-dv"> <span>Quantity</span>'.round($qtyrt).$ml.'</div>
					<div class="cost-dv"> <span>Cost</span>$'.$fpricert.'</div>
					<div class="cost-dv"> <span>Percentage</span>'.floor($percrt).'%</div>
				</div>';
				
			if($chked[9] || $chked[13]) {
			$cost_mobile_data .='<div class="item">
					<div class="stage-silde">
						<div class="stage-row"> <span class="c-bg">Cost Of Root Booster</span> <span>&nbsp;</span> </div>
						<div class="cl"></div>
						<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
						<div class="sel-text">
							<div class="week-col pro-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-RootAB.png"><span>Root Booster</span></div>
							<div class="week-col ec-col-new"> <span class="s-state">Quantity</span>'.round($mqtyrt).$ml.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Cost</span>$'.$mfpricert.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Percentage</span>'.floor($mpercrt).'%</div>
						</div>
					</div>
				</div>';
			}
			}
			
			if ($qtygb > 0)	 {
			$data .='<div class="cost-col">
					<h3>Grow Booster</h3>
					<div class="cost-dv gr-img"> <img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-Grow.png"> </div>
					<div class="cost-dv"> <span>Quantity</span>'.round($qtygb).$ml.'</div>
					<div class="cost-dv"> <span>Cost</span>$'.$fpricegb.'</div>
					<div class="cost-dv"> <span>Percentage</span>'.floor($percgb).'%</div>
				</div>';
			
			if($chked[10]  || $chked[14]) {	
			$cost_mobile_data .='<div class="item">
					<div class="stage-silde">
						<div class="stage-row"> <span class="c-bg">Cost Of Grow Booster</span> <span>&nbsp;</span> </div>
						<div class="cl"></div>
						<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
						<div class="sel-text">
							<div class="week-col pro-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-Grow.png"><span>Grow Booster</span></div>
							<div class="week-col ec-col-new"> <span class="s-state">Quantity</span>'.round($mqtygb).$ml.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Cost</span>$'.$mfpricegb.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Percentage</span>'.floor($mpercgb).'%</div>
						</div>
					</div>
				</div>';
			}
			}
			
			if ($qtybm > 0)	 {
			$data .='<div class="cost-col">
					<h3>Bloom Minerals</h3>
					<div class="cost-dv gr-img"> <img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-Minerals.png"> </div>
					<div class="cost-dv"> <span>Quantity</span>'.round($qtybm).$ml.'</div>
					<div class="cost-dv"> <span>Cost</span>$'.$fpricebm.'</div>
					<div class="cost-dv"> <span>Percentage</span>'.floor($percbm).'%</div>
				</div>';
			
			if($chked[15]) {
			$cost_mobile_data .='<div class="item">
					<div class="stage-silde">
						<div class="stage-row"> <span class="c-bg">Cost Of Bloom Minerals</span> <span>&nbsp;</span> </div>
						<div class="cl"></div>
						<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
						<div class="sel-text">
							<div class="week-col pro-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-Minerals.png"><span>Bloom Minerals</span></div>
							<div class="week-col ec-col-new"> <span class="s-state">Quantity</span>'.round($mqtybm).$ml.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Cost</span>$'.$mfpricebm.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Percentage</span>'.floor($mpercbm).'%</div>
						</div>
					</div>
				</div>';
			}
			}
			
			if ($qtybb > 0)	 {
			$data .='<div class="cost-col">
					<h3>Bud Booster</h3>
					<div class="cost-dv gr-img"> <img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-Bud.png"> </div>
					<div class="cost-dv"> <span>Quantity</span>'.round($qtybb).$ml.'</div>
					<div class="cost-dv"> <span>Cost</span>$'.$fpricebb.'</div>
					<div class="cost-dv"> <span>Percentage</span>'.round($percbb).'%</div>
				</div>';
			
			if($chked[16]) {
			$cost_mobile_data .='<div class="item">
					<div class="stage-silde">
						<div class="stage-row"> <span class="c-bg">Cost Of Bud Booster</span> <span>&nbsp;</span> </div>
						<div class="cl"></div>
						<div class="sel-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
						<div class="sel-text">
							<div class="week-col pro-img"><img src="http://dev.reiziger.com/wp-content/uploads/2015/10/Cost-Bud.png"><span>Bud Booster</span></div>
							<div class="week-col ec-col-new"> <span class="s-state">Quantity</span>'.round($mqtybb).$ml.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Cost</span>$'.$mfpricebb.'</div>
							<div class="week-col ec-col-new"> <span class="s-state">Percentage</span>'.floor($mpercbb).'%</div>
						</div>
					</div>
				</div>';
			}
			}
			
			$data .='<div class="cost-col total-col">
					<div class="cost-dv"> <strong>Total Estimated Cost</strong></div>
					<div class="cost-dv"> &nbsp; </div>
					<div class="cost-dv">$'.$ttlest.'</div>
					<div class="cost-dv"></div>
				</div>
			</div></div></div>';
			
		$cost_mobile_data .='<div class="item">
					<div class="stage-silde total-area">
						<div class="stage-row"> <span class="c-bg">Total Cost Of Grow</span> <span>&nbsp;</span> </div>
						<div class="cl"></div>
						<div class="sel-img alltotal"><img src="http://dev.reiziger.com/wp-content/uploads/2015/11/seedling-img4.png"></div>
						<div class="sel-text">
							<div class="week-col"><span class="s-state">Total Cost</span>$'.$mttlest.'</div>
						</div>
					</div>
				</div>';
				
	$data .= '<!-- For Mobile -->
			<div class="mobile_sliders grow_guide">
				<div class="grow-stage stage-full-dv">
					<div class="heading-stage">
						<h2>Grow Stage</h2>
						<h3>For big lush,healthy, green plants.</h3>
					</div>
					<!-- Grow Food Slider --> <div id="mobile-owl-carousel" class="mobile-owl-carousel" >';
				
				$data .= $grow_mobile_data;
				
				$data.='</div></div>';
				
				$data.='<div class="Bloom-stage-new stage-full-dv">
					<div class="heading-stage">
						<h2>Bloom Stage</h2>
						<h3>To add mass and bulk to your yeilds.</h3>
					</div>
					<!-- Cost Slider --> <div id="mobile-owl-carousel" class="mobile-owl-carousel" >';
					$data .= $bloom_mobile_data;
				$data .='</div></div>';
				
				$data.='<div class="Bloom-stage-new stage-full-dv">
					<div class="heading-stage">
						<h2>Cost of Grow</h2>
						<h3>What is your investment.</h3>
					</div>
					<!-- Cost Slider --> <div id="mobile-owl-carousel" class="mobile-owl-carousel" >';
					$data .= $cost_mobile_data;
				$data .='</div></div>
			</div>';
		   echo $data;
	
?>