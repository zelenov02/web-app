<?
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['userName']) ) {
            if(empty($_POST['userName'])) {
                echo 'notName';
            } else {
                $name = "<b>Имя: </b>" . strip_tags($_POST['userName']) . "; ";
            }
        }
        if (isset($_POST['userTel']) ) {
            if(empty($_POST['userTel'])) {
                echo 'notTel';
            } else {
                $tel = "<b>Телефон: </b>" . strip_tags($_POST['userTel']) . "<br>";
            }
        }

        if (isset($_POST['userEmail']) ) {
            if(empty($_POST['userEmail'])) {
                echo 'notEmail';
            } else {
                $email = "<b>Email: </b>" . strip_tags($_POST['userEmail']) . "<br>";
            }
        }

        if (isset($_POST['agreement']) ) {
            echo 'agreement';
            if(empty($_POST['agreement'])) {
                echo 'agreement';
            } else {
                $agreement = "<b>Соглашение: </b>" . strip_tags($_POST['agreement']) . "<br>";
            }
        }

        if (isset($_POST['finalPrice']) ) {
            $finalPrice = "<b>Общая стоимость: </b>" . strip_tags($_POST['finalPrice']) . "<br>";
        }



        $productArr=[];
        $counter = 0;
        $body;
        $bodyHeader = '<table border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px; border-right:1px; border-color:#e2e2e2; border-style: solid; width:800px" width="800" align="center">
			<tr >
				<th colspan="3" style="width: 400px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;">' . $name . $tel . $finalPrice .'</th>
				<th colspan="4" style="width: 400px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;">' . $email . $agreement .'</th>
			</tr>';

        foreach ($_POST as $key =>  $value) {
            $body.= '<tr>';
            if (is_array($value) || $value instanceof Traversable) {
                foreach ($value as $k => $v) {

                    if($k == 'productImg'){
                        $productImg = '<img src="' . $v . '" width="100" height="100" alt="картинка товара">';
                        $body.=
                            '
											<td style="width: 100px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;">
											'
                            . $productImg .
                            '
											</div></td>';
                    }
                    if($k == 'productName'){
                        $body.=
                            '<td style="width: 300px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;">
											'
                            . $v .
                            '
											</div></td>';
                    }
                    if($k == 'productSize'){
                        if(!empty($v)){
                            $body.=
                                '<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;"> Размер: 
											'
                                . $v .
                                '
											</div></td>';
                        } else {
                            $body.=
                                '<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
									<div style="padding: 5px;"> Размер отстутствует </div>
								</td>';
                        }
                    }
                    if($k == 'productId'){
                        $body.=
                            '<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> ID: 
												'
                            . $v .
                            '
												</div></td>';
                    }
                    if($k == 'productPrice'){
                        $body.=
                            '<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Цена: 
												'
                            . $v .
                            '
												</div></td>';
                    }
                    if($k == 'productQuantity'){
                        $body.=
                            '<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Кол-во: 
												'
                            . $v .
                            '
												</div></td>';
                    }

                    if($k == 'productPriceCommon'){
                        $body.=
                            '<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Общая цена:
												'
                            . $v .
                            '
												</div></td>';
                    }

                }

                $body.= '</tr>';
            }

        };
        $bodybottom = '</table>';
    }

    $token = "XXXX";
    $chat_id = "XXX";
    $arr = array(
        'Новый заказ',
        'Имя пользователя: ' => $name,
        'Телефон: ' => $tel,
        'Email ' => $email,
    );

    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

    if ($sendToTelegram) {
        header('Location: /');
    } else {
        echo "Error";
    }
}
