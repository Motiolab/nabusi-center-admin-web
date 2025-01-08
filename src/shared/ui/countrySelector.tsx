

import React, { useState } from 'react';
import type { RadioChangeEvent, SelectProps } from 'antd';
import { Radio, Select } from 'antd';

const options: SelectProps['options'] = [
    { name: '괌', value: '1671', label: '+1671' },
    { name: '그리스', value: '30', label: '+30' },
    { name: '네덜란드', value: '31', label: '+31' },
    { name: '네팔', value: '977', label: '+977' },
    { name: '노르웨이', value: '47', label: '+47' },
    { name: '뉴질랜드', value: '64', label: '+64' },
    { name: '대만', value: '886', label: '+886' },
    { name: '대한민국', value: '82', label: '+82' },
    { name: '덴마크', value: '45', label: '+45' },
    { name: '도미니카 공화국', value: '1809', label: '+1809' },
    { name: '도미니카 공화국', value: '1829', label: '+1829' },
    { name: '독일', value: '49', label: '+49' },
    { name: '라오스', value: '856', label: '+856' },
    { name: '라트비아', value: '371', label: '+371' },
    { name: '러시아', value: '7', label: '+7' },
    { name: '레바논', value: '961', label: '+961' },
    { name: '루마니아', value: '40', label: '+40' },
    { name: '룩셈부르크', value: '352', label: '+352' },
    { name: '리투아니아', value: '370', label: '+370' },
    { name: '리히텐슈타인', value: '423', label: '+423' },
    { name: '마카오', value: '853', label: '+853' },
    { name: '말레이시아', value: '60', label: '+60' },
    { name: '멕시코', value: '52', label: '+52' },
    { name: '모나코', value: '377', label: '+377' },
    { name: '모로코', value: '212', label: '+212' },
    { name: '몰도바', value: '373', label: '+373' },
    { name: '몰디브', value: '960', label: '+960' },
    { name: '몰타', value: '356', label: '+356' },
    { name: '몽골', value: '976', label: '+976' },
    { name: '미국', value: '1', label: '+1' },
    { name: '미얀마', value: '95', label: '+95' },
    { name: '방글라데시', value: '880', label: '+880' },
    { name: '베네수엘라', value: '58', label: '+58' },
    { name: '베트남', value: '84', label: '+84' },
    { name: '벨기에', value: '32', label: '+32' },
    { name: '벨라루스', value: '375', label: '+375' },
    { name: '볼리비아', value: '591', label: '+591' },
    { name: '부탄', value: '975', label: '+975' },
    { name: '북마케도니아', value: '389', label: '+389' },
    { name: '불가리아', value: '359', label: '+359' },
    { name: '브라질', value: '55', label: '+55' },
    { name: '사우디아라비아', value: '966', label: '+966' },
    { name: '세르비아', value: '381', label: '+381' },
    { name: '스리랑카', value: '94', label: '+94' },
    { name: '스웨덴', value: '46', label: '+46' },
    { name: '스위스', value: '41', label: '+41' },
    { name: '스페인', value: '34', label: '+34' },
    { name: '슬로바키아', value: '421', label: '+421' },
    { name: '슬로베니아', value: '386', label: '+386' },
    { name: '싱가포르', value: '65', label: '+65' },
    { name: '아랍에미리트', value: '971', label: '+971' },
    { name: '아르메니아', value: '374', label: '+374' },
    { name: '아르헨티다', value: '54', label: '+54' },
    { name: '아일랜드', value: '353', label: '+353' },
    { name: '아제르바이잔', value: '994', label: '+994' },
    { name: '알바니아', value: '355', label: '+355' },
    { name: '에스토니아', value: '372', label: '+372' },
    { name: '에콰도르', value: '593', label: '+593' },
    { name: '엘살바도르', value: '503', label: '+503' },
    { name: '영국', value: '44', label: '+44' },
    { name: '오만', value: '968', label: '+968' },
    { name: '오스트리아', value: '43', label: '+43' },
    { name: '온두라스', value: '504', label: '+504' },
    { name: '우루과이', value: '598', label: '+598' },
    { name: '우즈베키스탄', value: '998', label: '+998' },
    { name: '우크라이나', value: '380', label: '+380' },
    { name: '이라크', value: '964', label: '+964' },
    { name: '이란', value: '98', label: '+98' },
    { name: '이스라엘', value: '972', label: '+972' },
    { name: '이집트', value: '20', label: '+20' },
    { name: '이탈리아', value: '39', label: '+39' },
    { name: '인도', value: '91', label: '+91' },
    { name: '인도네시아', value: '62', label: '+62' },
    { name: '일본', value: '81', label: '+81' },
    { name: '중국', value: '86', label: '+86' },
    { name: '체코', value: '420', label: '+420' },
    { name: '칠레', value: '56', label: '+56' },
    { name: '카자하스탄', value: '7', label: '+7' },
    { name: '카타르', value: '974', label: '+974' },
    { name: '캄보디아', value: '855', label: '+855' },
    { name: '캐나다', value: '1', label: '+1' },
    { name: '코스타리카', value: '506', label: '+506' },
    { name: '콜롬비아', value: '57', label: '+57' },
    { name: '쿠바', value: '53', label: '+53' },
    { name: '쿠웨이트', value: '965', label: '+965' },
    { name: '크로아티아', value: '385', label: '+385' },
    { name: '태국', value: '66', label: '+66' },
    { name: '터키', value: '90', label: '+90' },
    { name: '파나마', value: '507', label: '+507' },
    { name: '파라과이', value: '595', label: '+595' },
    { name: '파키스탄', value: '92', label: '+92' },
    { name: '파푸아 뉴기니', value: '675', label: '+675' },
    { name: '팔레스타인', value: '970', label: '+970' },
    { name: '페루', value: '51', label: '+51' },
    { name: '포르투갈', value: '351', label: '+351' },
    { name: '폴란드', value: '48', label: '+48' },
    { name: '프랑스', value: '33', label: '+33' },
    { name: '핀란드', value: '358', label: '+358' },
    { name: '필리핀', value: '63', label: '+63' },
    { name: '헝가리', value: '36', label: '+36' },
    { name: '호주', value: '61', label: '+61' },
    { name: '홍콩', value: '852', label: '+852' }
];

interface IProps {
    selectedValue: string;
    onChangeSelector: (countryCode: string) => void;
}

const CountrySelector = ({ selectedValue, onChangeSelector }: IProps) => {
    return (
        <>
            <Select
                defaultValue="82"
                style={{ width: 92 }}
                dropdownMatchSelectWidth={false}
                placement={'bottomLeft'}
                options={options}
                value={selectedValue}
                onChange={(e) => {
                    onChangeSelector(e);
                }}
                size='large'
                optionRender={(option) => (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '172px', textAlign: 'center' }}>{option.data.name}</div>
                        <div style={{ width: '172px', textAlign: 'center' }}>{option.data.label}</div>
                    </div>
                )}
            />
        </>
    );
};

export default CountrySelector;