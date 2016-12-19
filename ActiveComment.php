<?php

namespace zhang\comment;

use Yii;
use yii\base\Widget;

class ActiveComment extends Widget
{
    public $type = 'duoshuo';

    /**
     * 配置项
     * @var [type]
     */
    public $options = [];

    public function init(){
        if (!isset($this->type)) {
            $this->type = 'duoshuo';
        }
        ob_start();
        ob_implicit_flush(false);
    }

    public function run()
    {
        $content = ob_get_clean();
        echo $this->show($this->type);
        echo $content;
    }

    /**
     * 显示最终的评论框
     * @param  string $type [description]
     * @return [type]       [description]
     */
    public function show($type = 'duoshuo'){
        $code = file_get_contents(__DIR__ . '/'.$type.'/code.tpl');
        switch ($type) {
            case 'duoshuo':
            $realCode = $this->getDuoshuoCode($code);
            break;
            case 'changyan':
            $realCode = $this->getChangyanCode($code);
            break;
        }
        return $realCode;
    }

    /**
     * 处理多说模版
     * <?php $abc = ActiveComment::begin([
            'type' => 'duoshuo',
            'options' => [
                'id' => 1,
                'title' => '测试',
                'url' => 'http://www.baidu.com',
                'short_name' => 'laog',
            ],
        ]); ?>
        <?php ActiveComment::end(); ?>
     */
    public function getDuoshuoCode($code){
        $newCode = $code;
        $newCode = str_replace("{id}", $this->options['id'], $newCode);
        $newCode = str_replace("{title}", $this->options['title'], $newCode);
        $newCode = str_replace("{url}", $this->options['url'], $newCode);
        $newCode = str_replace("{short_name}", $this->options['short_name'], $newCode);
        return $newCode;
    }

    /**
     *  处理畅言模版
     *  <?php $abc = ActiveComment::begin([
            'type' => 'changyan',
            'options' => [
                'id' => 1,
                'appid' => 'cysKPnUmN',
                'conf' => 'prod_65b948343424471c8e4b18dbcef460e0',
            ],
        ]); ?>
        <?php ActiveComment::end(); ?>
     */
    public function getChangyanCode($code){
        $newCode = $code;
        $newCode = str_replace("{id}", $this->options['id'], $newCode);
        $newCode = str_replace("{appid}", $this->options['appid'], $newCode);
        $newCode = str_replace("{conf}", $this->options['conf'], $newCode);
        return $newCode;
    }
}
