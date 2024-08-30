<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['userName'])) {
        if (empty($_POST['userName'])) {
            echo 'notName';
        } else {
            $name = $_POST['userName'];
        }
    }
    if (isset($_POST['userTel'])) {
        if (empty($_POST['userTel'])) {
            echo 'notTel';
        } else {
            $tel = $_POST['userTel'];
        }
    }

    if (isset($_POST['userEmail'])) {
        if (empty($_POST['userEmail'])) {
            echo 'notEmail';
        } else {
            $email = $_POST['userEmail'];
        }
    }
    if (isset($_POST['agreement'])) {
        echo 'agreement';
        if (empty($_POST['agreement'])) {
            echo 'agreement';
        } else {
            $agreement = "<b>Соглашение: </b>" . strip_tags($_POST['agreement']) . "<br>";
        }
    }

    if (isset($_POST['finalPrice'])) {
        $finalPrice = $_POST['finalPrice'];
    }
}

foreach ($_POST as $key =>  $value) {
  if (is_array($value) || $value instanceof Traversable) {
    foreach ($value as $k => $v) {
      if($k == 'productImg'){
        $productImg = $v;
      }
      if($k == 'productName'){
        $productName = $v;
      }
      if($k == 'productSize'){
        if(!empty($v)){
          $productSize = $v;
        } else {
          $productSize = 0;
        }
      }
      if($k == 'productId'){
        $productId = $v;
      }
      if($k == 'productPrice'){
        $productPrice = $v;
      }
      if($k == 'productQuantity'){
        $productQuantity = $v;
      }

      if($k == 'productPriceCommon'){
        $productPriceCommon = $v;
      }

    }
  }

};

$token = "5741188732:AAG21_HY8kE9611CMzHAF2_HJCA48pHUMsA";
$chat_id = "-399030555";
$arr = array(
  'Новый заказ',
  'Имя пользователя: ' => $name,
  'Телефон: ' => $tel,
  'Email ' => $email,
  'Товар: ' => $productName,
  'Количество: ' => $productQuantity,
  'Общая стоимость: ' => $productPriceCommon
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