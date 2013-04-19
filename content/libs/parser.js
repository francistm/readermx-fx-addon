if(typeof ReaderMX == "undefined") {
    var ReaderMX = {};
}

ReaderMX.Lib = {
    "AddPost" : function ($R) {
        $R.$win = $($R.win);
        $R.$document = $($R.document);
        $R.hrefmx = top.window.location.href;
        $R.titlemx = undefined;

        var ssuplink = function(links, location) {
            if(/^https?:\/\//gi.test(links)) {
                return links;
            }

            var dataArr = location.match(/^https?:\/\/([^\/]+)/gi), basehost = dataArr[0];

            if (links.indexOf('/') === 0) {
                return basehost + links;
            }
            if (links.indexOf('../') === 0) {
                var ss = links.split('../').length - 1,  // 3
                    sarr = location.replace(basehost, '').split('/'),
                    sarrint = sarr.length - 1,
                    sstrx = '', nusm = sarrint - ss;
                for (var i = 0;i < nusm;i++) {
                    if (sarr[i]) {
                        var tempste = sarr[i] + '/';
                        sstrx += tempste;
                    }
                }
                return basehost + '/' + sstrx + links.replace(/..\/+/gi, '');
            }
            if (links.indexOf('?') === 0) {
                return location + links;
            }
            var sxarr = location.replace(basehost, '').split('/');
            sxarr.pop();
            return basehost + sxarr.join('/') + '/' + links;
        }

        //  options
        //  =======
        $R.parsingOptions =
        {
            '_elements_ignore':                     '|button|label|input|select|textarea|optgroup|command|datalist|--|frame|frameset|noframes|--|style|link|script|noscript|--|canvas|applet|map|--|marquee|area|base|',
            '_elements_ignore_tag':                 '|form|fieldset|details|dir|--|center|font|span|',

            '_elements_container':                  '|body|--|article|section|--|div|--|td|--|li|--|dd|dt|',
            '_elements_self_closing':               '|br|hr|--|img|--|col|--|source|--|embed|param|--|iframe|',

            '_elements_visible':                    '|article|section|--|ul|ol|li|dd|--|table|tr|td|--|div|--|p|--|h1|h2|h3|h4|h5|h6|--|span|',
            '_elements_too_much_content':           '|b|i|em|strong|--|h1|h2|h3|h4|h5|--|td|',
            '_elements_link_density':               '|div|--|table|ul|ol|--|section|aside|header|',
            '_elements_floating':                   '|div|--|table|',
            '_elements_above_target_ignore':        '|br|--|ul|ol|dl|--|table|',

            '_elements_highlight_protect':          '|video|audio|source|--|object|param|embed|',

            '_elements_keep_attributes':
            {
                'a':        ['href', 'title', 'name'],
                'img':      ['src', 'width', 'height', 'alt', 'title'],

                'video':    ['src', 'width', 'height', 'poster', 'audio', 'preload', 'autoplay', 'loop', 'controls'],
                'audio':    ['src', 'preload', 'autoplay', 'loop', 'controls'],
                'source':   ['src', 'type'],

                'object':   ['data', 'type', 'width', 'height', 'classid', 'codebase', 'codetype'],
                'param':    ['name', 'value'],
                'embed':    ['src', 'type', 'width', 'height', 'flashvars', 'allowscriptaccess', 'allowfullscreen', 'bgcolor'],

                'iframe':   ['src', 'width', 'height', 'frameborder', 'scrolling'],

                'td':       ['colspan', 'rowspan'],
                'th':       ['colspan', 'rowspan']
            }
        };

        //  skip links
        //  ==========
        $R.skipStuffFromDomains__links =
            [
                'doubleclick.net',
                'fastclick.net',
                'adbrite.com',
                'adbureau.net',
                'admob.com',
                'bannersxchange.com',
                'buysellads.com',
                'impact-ad.jp',
                'atdmt.com',
                'advertising.com',
                'itmedia.jp',
                'microad.jp',
                'serving-sys.com',
                'adplan-ds.com'
            ];
        //  skip images
        //  ===========
        $R.skipStuffFromDomain__images =
            [
                'googlesyndication.com',
                'fastclick.net',
                '.2mdn.net',
                'de17a.com',
                'content.aimatch.com',
                'bannersxchange.com',
                'buysellads.com',
                'impact-ad.jp',
                'atdmt.com',
                'advertising.com',
                'itmedia.jp',
                'microad.jp',
                'serving-sys.com',
                'adplan-ds.com'
            ];

        //  keep video
        //  ==========
        $R.keepStuffFromDomain__video =
            [
                'youtube.com',
                'youtube-nocookie.com',

                'vimeo.com',
                'hulu.com',
                'yahoo.com',
                'flickr.com',
                'newsnetz.ch',
                'youku.com',
                '56.com',
                'baidu.com',
                'tudou.com'
            ];

        $R.getContent__computeDetailsForCandidate = function (_e, _main)
        {
            var _r = {};


            //  bad candidate
            //  =============
            if (_e._is__bad) { return _r; }


            //  paragraphs
            //  ==========
            _r['_count__lines_of_65_characters'] = (_e._length__plain_text / 65);
            _r['_count__paragraphs_of_3_lines'] =  (_r._count__lines_of_65_characters / 3);
            _r['_count__paragraphs_of_5_lines'] =  (_r._count__lines_of_65_characters / 5);

            _r['_count__paragraphs_of_50_words'] = (_e._count__plain_words / 50);
            _r['_count__paragraphs_of_80_words'] = (_e._count__plain_words / 80);


            //  total text
            //  ==========
            _r['_ratio__length__plain_text_to_total_plain_text'] =  (_e._length__plain_text / _main._length__plain_text);
            _r['_ratio__count__plain_words_to_total_plain_words'] = (_e._count__plain_words / _main._count__plain_words);


            //  links
            //  =====
            _r['_ratio__length__links_text_to_plain_text'] =  (_e._length__links_text / _e._length__plain_text);
            _r['_ratio__count__links_words_to_plain_words'] = (_e._count__links_words / _e._count__plain_words);

            _r['_ratio__length__links_text_to_all_text'] =  (_e._length__links_text / _e._length__all_text);
            _r['_ratio__count__links_words_to_all_words'] = (_e._count__links_words / _e._count__all_words);

            _r['_ratio__length__links_text_to_total_links_text'] =  (_e._length__links_text / (_main._length__links_text + 1));
            _r['_ratio__count__links_words_to_total_links_words'] = (_e._count__links_words / (_main._count__links_words + 1));

            _r['_ratio__count__links_to_total_links'] = (_e._count__links / (_main._count__links + 1));
            _r['_ratio__count__links_to_plain_words'] = ((_e._count__links * 2) / _e._count__plain_words);


            //  text above
            //  ==========
            var
                _divide__candidates = Math.max(2, Math.ceil(_e._count__above_candidates * 0.5)),

                _above_text = ((0
                    + (_e._length__above_plain_text * 1)
                    + (_e._length__above_plain_text / _divide__candidates)
                    ) / 2),

                _above_words = ((0
                    + (_e._count__above_plain_words * 1)
                    + (_e._count__above_plain_words / _divide__candidates)
                    ) / 2)
                ;

            _r['_ratio__length__above_plain_text_to_total_plain_text'] =  (_above_text / _main._length__plain_text);
            _r['_ratio__count__above_plain_words_to_total_plain_words'] = (_above_words / _main._count__plain_words);


            //  candidates
            //  ==========
            _r['_ratio__count__candidates_to_total_candidates'] = (_e._count__candidates / (_main._count__candidates + 1));
            _r['_ratio__count__containers_to_total_containers'] = (_e._count__containers / (_main._count__containers + 1));

            //  return
            //  ======
            return _r;
        };

        $R.getContent__computePointsForCandidate = function (_e, _main)
        {
            var
                _details = _e.__candidate_details,
                _points_history = [],
                _really_big = ((_main._length__plain_text / 65) > 250)
                ;

            //  bad candidate
            if (_e._is__bad) { return [0]; }


            //  the basics
            //  ==========
            _points_history.unshift(((0
                + (_details._count__paragraphs_of_3_lines)
                + (_details._count__paragraphs_of_5_lines * 1.5)
                + (_details._count__paragraphs_of_50_words)
                + (_details._count__paragraphs_of_80_words * 1.5)
                + (_e._count__images_large * 3)
                - ((_e._count__images_skip + _e._count__images_small) * 0.5)
                ) * 1000));

            //  negative
            if (_points_history[0] < 0) { return [0]; }


            //  candidates, containers, pieces
            //  ==============================
            var
                _divide__pieces =     Math.max(5,  Math.ceil(_e._count__pieces *     0.25)),
                _divide__candidates = Math.max(5,  Math.ceil(_e._count__candidates * 0.25)),
                _divide__containers = Math.max(10, Math.ceil(_e._count__containers * 0.25))
                ;

            _points_history.unshift(((0
                + (_points_history[0] * 3)
                + (_points_history[0] / _divide__pieces)
                + (_points_history[0] / _divide__candidates)
                + (_points_history[0] / _divide__containers)
                ) / 6));


            //  total text
            //  ==========
            $R.getContent__computePointsForCandidate__do(0.10, 2, (1 - (1 - _details._ratio__length__plain_text_to_total_plain_text)), _points_history);
            $R.getContent__computePointsForCandidate__do(0.10, 2, (1 - (1 - _details._ratio__count__plain_words_to_total_plain_words)), _points_history);

            if (_really_big) {
                $R.getContent__computePointsForCandidate__do(0.10, 4, (1 - (1 - _details._ratio__length__plain_text_to_total_plain_text)), _points_history);
                $R.getContent__computePointsForCandidate__do(0.10, 4, (1 - (1 - _details._ratio__count__plain_words_to_total_plain_words)), _points_history);
            }


            //  text above
            //  ==========
            $R.getContent__computePointsForCandidate__do(0.10, 5, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.10, 5, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);

            if (_really_big) {
                $R.getContent__computePointsForCandidate__do(0.10, 10, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
                $R.getContent__computePointsForCandidate__do(0.10, 10, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);
            }


            //  links outer
            //  ===========
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__length__links_text_to_total_links_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__links_words_to_total_links_words), _points_history);

            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__links_to_total_links), _points_history);


            //  links inner
            //  ===========
            var __lr = ($R.language == 'cjk' ? 0.75 : 0.50);

            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);

            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_all_text), _points_history);
            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_all_words), _points_history);

            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_to_plain_words), _points_history);


            //  candidates, containers, pieces
            //  ==============================
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__candidates_to_total_candidates), _points_history);
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__containers_to_total_containers), _points_history);
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__pieces_to_total_pieces), _points_history);


            //  return -- will get [0] as the actual final points
            //  ======
            return _points_history;
        };

        $R.getContent__computeDetailsForCandidateSecond = function (_e, _main)
        {
            var _r = {};


            //  bad candidate
            //  =============
            if (_e._is__bad) { return _r; }


            //  total text
            //  ==========
            _r['_ratio__length__plain_text_to_total_plain_text'] =  (_e._length__plain_text / _main._length__plain_text);
            _r['_ratio__count__plain_words_to_total_plain_words'] = (_e._count__plain_words / _main._count__plain_words);


            //  links
            //  =====
            _r['_ratio__length__links_text_to_all_text'] =  (_e._length__links_text / _e._length__all_text);
            _r['_ratio__count__links_words_to_all_words'] = (_e._count__links_words / _e._count__all_words);

            _r['_ratio__length__links_text_to_total_links_text'] =  (_e._length__links_text / (_main._length__links_text + 1));
            _r['_ratio__count__links_words_to_total_links_words'] = (_e._count__links_words / (_main._count__links_words + 1));

            _r['_ratio__count__links_to_total_links'] = (_e._count__links / (_main._count__links + 1));
            _r['_ratio__count__links_to_plain_words'] = ((_e._count__links * 2) / _e._count__plain_words);


            //  text above
            //  ==========

            var
                _divide__candidates = Math.max(2, Math.ceil((_e._count__above_candidates - _main._count__above_candidates) * 0.5)),

                _above_text = ((0
                    + (_e.__second_length__above_plain_text * 1)
                    + (_e.__second_length__above_plain_text / _divide__candidates)
                    ) / 2),

                _above_words = ((0
                    + (_e.__second_count__above_plain_words * 1)
                    + (_e.__second_count__above_plain_words / _divide__candidates)
                    ) / 2)
                ;

            _r['_ratio__length__above_plain_text_to_total_plain_text'] =  (_above_text / _main._length__plain_text);
            _r['_ratio__count__above_plain_words_to_total_plain_words'] = (_above_words / _main._count__plain_words);

            _r['_ratio__length__above_plain_text_to_plain_text'] =  (_above_text / _e._length__plain_text);
            _r['_ratio__count__above_plain_words_to_plain_words'] = (_above_words / _e._count__plain_words);


            //  candidates
            //  ==========
            _r['_ratio__count__candidates_to_total_candidates'] = (Math.max(0, (_e._count__candidates - (_main._count__candidates * 0.25))) / (_main._count__candidates + 1));
            _r['_ratio__count__containers_to_total_containers'] = (Math.max(0, (_e._count__containers - (_main._count__containers * 0.25))) / (_main._count__containers + 1));
            _r['_ratio__count__pieces_to_total_pieces'] =         (Math.max(0, (_e._count__pieces - (_main._count__pieces * 0.25))) / (_main._count__pieces + 1));


            //  return
            //  ======
            return _r;
        };

        $R.getContent__computePointsForCandidateSecond = function (_e, _main)
        {
            var
                _details = _e.__candidate_details,
                _details_second = _e.__candidate_details_second,
                _points_history = []
                ;

            //  bad candidate
            if (_e._is__bad) { return [0]; }


            //  get initial points
            //  ==================
            _points_history.unshift(_e.__points_history[(_e.__points_history.length-1)]);


            //  candidates, containers, pieces
            //  ==============================
            var
                _divide__pieces =     Math.max(5,  Math.ceil(_e._count__pieces *     0.25)),
                _divide__candidates = Math.max(5,  Math.ceil(_e._count__candidates * 0.25)),
                _divide__containers = Math.max(10, Math.ceil(_e._count__containers * 0.25))
                ;

            _points_history.unshift(((0
                + (_points_history[0] * 3)
                + ((_points_history[0] / _divide__pieces) * 2)
                + ((_points_history[0] / _divide__candidates) * 2)
                + ((_points_history[0] / _divide__containers) * 2)
                ) / 9));


            //  total text
            //  ==========
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - (1 - _details_second._ratio__length__plain_text_to_total_plain_text)), _points_history);
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - (1 - _details_second._ratio__count__plain_words_to_total_plain_words)), _points_history);


            //  text above
            //  ==========
            var __ar = ($R.language == 'cjk' ? 0.50 : 0.10);

            $R.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__count__above_plain_words_to_total_plain_words), _points_history);

            $R.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__length__above_plain_text_to_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__count__above_plain_words_to_plain_words), _points_history);


            //  links outer
            //  ===========
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details_second._ratio__count__links_to_total_links), _points_history);
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details_second._ratio__length__links_text_to_total_links_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details_second._ratio__count__links_words_to_total_links_words), _points_history);


            //  links inner
            //  ===========
            var __lr = ($R.language == 'cjk' ? 0.75 : 0.50);

            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);

            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details_second._ratio__length__links_text_to_all_text), _points_history);
            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details_second._ratio__count__links_words_to_all_words), _points_history);

            $R.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details_second._ratio__count__links_to_plain_words), _points_history);


            //  candidates, containers, pieces
            //  ==============================
            $R.getContent__computePointsForCandidate__do(0.10, 2, (1 - _details_second._ratio__count__candidates_to_total_candidates), _points_history);
            $R.getContent__computePointsForCandidate__do(0.10, 2, (1 - _details_second._ratio__count__containers_to_total_containers), _points_history);
            $R.getContent__computePointsForCandidate__do(0.10, 2, (1 - _details_second._ratio__count__pieces_to_total_pieces), _points_history);


            //  return -- will get [0] as the actual final points
            //  ======
            return _points_history;
        };

        $R.getContent__computePointsForCandidate__do = function (_ratio_remaining, _power, _ratio, _points_history)
        {
            var
                _points_remaining = (_points_history[0] * _ratio_remaining),
                _points_to_compute = (_points_history[0] - _points_remaining)
                ;

            if (_ratio < 0)
            {
                //_points_return = (0.75 * _points_remaining);
                _points_return = _points_remaining;
            }
            else
            {
                _points_return = 0
                    + _points_remaining
                    + (_points_to_compute * Math.pow(_ratio, _power))
                ;
            }

            //  add
            _points_history.unshift(_points_return);
        };

        //  article title check function
        //  ============================
        $R.getContent__find__hasIsolatedTitleInHTML = function (_html)
        {
            return (_html.substr(0, $R.articleTitleMarker__start.length) == $R.articleTitleMarker__start);
        };

        //  article title get function
        //  ============================
        $R.getContent__find__getIsolatedTitleInHTML = function (_html)
        {
            //  is it there?
            if ($R.getContent__find__hasIsolatedTitleInHTML(_html)); else { return ''; }

            //  regex
            var
                _getTitleRegex = new RegExp($R.articleTitleMarker__start + '(.*?)' + $R.articleTitleMarker__end, 'i'),
                _getTitleMatch = _html.match(_getTitleRegex)
                ;

            //  match?
            if (_getTitleMatch); else { return ''; }

            //  return
            return _getTitleMatch[1];
        };

        //  article title marker
        //  ====================
        $R.articleTitleMarker__start = '<div id="articleHeader"><h1>';
        $R.articleTitleMarker__end = '</h1></div>';

        //  find title in arbitrary html
        //  ============================
        $R.getContent__find__isolateTitleInHTML = function (_html, _document_title)
        {
            //  can't just use (h1|h2|h3|etc) -- we want to try them in a certain order
            //  =============================
            var
                _heading_pregs = [
                    /<(h1)[^>]*?>([\s\S]+?)<\/\1>/gi,
                    /<(h2)[^>]*?>([\s\S]+?)<\/\1>/gi,
                    /<(h3|h4|h5|h6)[^>]*?>([\s\S]+?)<\/\1>/gi
                ],
                _secondary_headings = '|h2|h3|h4|h5|h6|',
                _search_document_title = ' ' + _document_title.replace(/<[^>]+?>/gi, '').replace(/\s+/gi, ' ') + ' '
                ;

            //  loop pregs
            //  ==========
            for (var i=0, _i=_heading_pregs.length; i<_i; i++)
            {
                //  exec
                var _match = _heading_pregs[i].exec(_html);

                //  return?
                switch (true)
                {
                    case (!(_match)):
                    case (!(_heading_pregs[i].lastIndex > -1)):
                        //  will continue loop
                        break;

                    default:

                        //  measurements
                        var
                            _heading_end_pos = _heading_pregs[i].lastIndex,
                            _heading_start_pos = (_heading_end_pos - _match[0].length),

                            _heading_type = _match[1],
                            _heading_text = _match[2].replace(/<\s*br[^>]*>/gi, '').replace(/[\n\r]+/gi, ''),
                            _heading_text_plain = _heading_text.replace(/<[^>]+?>/gi, '').replace(/\s+/gi, ' ');
                        _heading_length = $R.measureText__getTextLength(_heading_text_plain),
                            _heading_words = [],

                            _to_heading_text = _html.substr(0, _heading_start_pos),
                            _to_heading_length = $R.measureText__getTextLength(_to_heading_text.replace(/<[^>]+?>/gi, '').replace(/\s+/gi, ' '))
                        ;

                        //  return?
                        switch (true)
                        {
                            case (!(_heading_length > 5)):
                            case (!(_heading_length < (65 * 3))):
                            case (!(_to_heading_length < (65 * 3 * 2))):
                                //  will continue for loop
                                break;

                            case ((_secondary_headings.indexOf('|' + _heading_type + '|') > -1)):
                                //  words in this heading
                                _heading_words = _heading_text_plain.split(' ');

                                //  count words present in title
                                for (var j=0, _j=_heading_words.length, _matched_words=''; j<_j; j++) {
                                    if (_search_document_title.indexOf(' ' + _heading_words[j] + ' ') > -1) {
                                        _matched_words += _heading_words[j] + ' ';
                                    }
                                }

                                //  break continues for loop
                                //  nothing goes to switch's default
                                //  ================================

                                //  no break?
                                var _no_break = false;
                                switch (true)
                                {
                                    //  if it's big enough, and it's a substring of the title, it's good
                                    case ((_heading_length > 20) && (_search_document_title.indexOf(_heading_text_plain) > -1)):

                                    //  if it's slightly smaler, but is exactly at the begging or the end
                                    case ((_heading_length > 10) && ((_search_document_title.indexOf(_heading_text_plain) == 1) || (_search_document_title.indexOf(_heading_text_plain) == (_search_document_title.length - 1 - _heading_text_plain.length)))):

                                        _no_break = true;
                                        break;
                                }

                                //  break?
                                var _break = false;
                                switch (true)
                                {
                                    //  no break?
                                    case (_no_break):
                                        break;


                                    // heading too long? -- if not h2
                                    case ((_heading_length > ((_search_document_title.length - 2) * 2)) && (_heading_type != 'h2')):

                                    //  heading long enough?
                                    case ((_heading_length < Math.ceil((_search_document_title.length - 2) * 0.50))):

                                    //  enough words matched?
                                    case ((_heading_length < 25) && (_matched_words.length < Math.ceil(_heading_length * 0.75))):
                                    case ((_heading_length < 50) && (_matched_words.length < Math.ceil(_heading_length * 0.65))):
                                    case ((_matched_words.length < Math.ceil(_heading_length * 0.55))):

                                        _break = true;
                                        break;
                                }

                                //  break?
                                if (_break) { break; }


                            default:
                                //  this is the title -- do isolation; return
                                //  =================
                                if($R.titlemx) {
                                    _heading_text = $R.titlemx;
                                }
                                return ''

                                    + $R.articleTitleMarker__start
                                    +   _heading_text
                                    + $R.articleTitleMarker__end

                                    + _html.substr(_heading_end_pos)
                                    ;
                        }

                        break;
                }
            }

            //  return unmodified
            return _html;
        };

        //  main object
        //  ===========
        $R.sel = {};
        // 获取内容的探索节点和得到的东西
        $R.getContent__exploreNodeAndGetStuff = function (_nodeToExplore, _justExploring)
        {
            var
                _global__element_index = 0,

                _global__inside_link = false,
                _global__inside_link__element_index = 0,

                _global__length__above_plain_text = 0,
                _global__count__above_plain_words = 0,
                _global__length__above_links_text = 0,
                _global__count__above_links_words = 0,
                _global__count__above_candidates = 0,
                _global__count__above_containers = 0,
                _global__above__plain_text = '',
                _global__above__links_text = '',

                _return__containers = [],
                _return__candidates = [],
                _return__links = []
                ;

            //  recursive function
            //  ==================
            var _recursive = function (_node)
            {
                //  increment index
                //  starts with 1
                _global__element_index++;

                var
                    _tag_name = (_node.nodeType === 3 ? '#text' : ((_node.nodeType === 1 && _node.tagName && _node.tagName > '') ? _node.tagName.toLowerCase() : '#invalid')),
                    _result =
                    {
                        '__index': _global__element_index,
                        '__node': _node,


                        '_is__container':       ($R.parsingOptions._elements_container.indexOf('|'+_tag_name+'|') > -1),
                        '_is__candidate':       false,
                        '_is__text':            false,
                        '_is__link':            false,
                        '_is__link_skip':       false,
                        '_is__image_small':     false,
                        '_is__image_medium':    false,
                        '_is__image_large':     false,
                        '_is__image_skip':      false,

                        '_debug__above__plain_text': _global__above__plain_text,
                        '_debug__above__links_text': _global__above__links_text,


                        '_length__above_plain_text': _global__length__above_plain_text,
                        '_count__above_plain_words': _global__count__above_plain_words,

                        '_length__above_links_text': _global__length__above_links_text,
                        '_count__above_links_words': _global__count__above_links_words,

                        '_length__above_all_text':  (_global__length__above_plain_text + _global__length__above_links_text),
                        '_count__above_all_words':  (_global__count__above_plain_words + _global__count__above_links_words),

                        '_count__above_candidates': _global__count__above_candidates,
                        '_count__above_containers': _global__count__above_containers,

                        '_length__plain_text': 0,
                        '_count__plain_words': 0,

                        '_length__links_text': 0,
                        '_count__links_words': 0,

                        '_length__all_text': 0,
                        '_count__all_words': 0,


                        '_count__containers': 0,
                        '_count__candidates': 0,

                        '_count__links': 0,
                        '_count__links_skip': 0,

                        '_count__images_small': 0,
                        '_count__images_medium': 0,
                        '_count__images_large': 0,
                        '_count__images_skip': 0
                    };


                //  fast return
                //  ===========
                switch (true)
                {
                    case ((_tag_name == '#invalid')):
                    case (($R.parsingOptions._elements_ignore.indexOf('|'+_tag_name+'|') > -1)):
                        return;

                    case (($R.parsingOptions._elements_visible.indexOf('|'+_tag_name+'|') > -1)):

                        //  included inline
                        //  _node, _tag_name must be defined
                        //  will return, if node is hidden

                        switch (true)
                        {
                            case (_node.offsetWidth > 0):
                            case (_node.offsetHeight > 0):
                                break;

                            default:
                                switch (true)
                                {
                                    case (_node.offsetLeft > 0):
                                    case (_node.offsetTop > 0):
                                        break;

                                    default:
                                        //  exclude inline DIVs -- which, stupidly, don't have a width/height
                                        if ((_tag_name == 'div') && ((_node.style.display || $.css( _node, "display" )) == 'inline'))
                                        { break; }

                                        //  it's hidden; exit current scope
                                        return;
                                }
                                break;
                        }

                        break;

                    //  self-closing -- with some exceptions
                    case ($R.parsingOptions._elements_self_closing.indexOf('|'+_tag_name+'|') > -1):
                        switch (true)
                        {
                            case ((_tag_name == 'img')): break;
                            default: return;
                        }
                        break;
                }


                //  do stuff
                //  ========
                switch (true)
                {
                    //  text node
                    //  =========
                    case ((_tag_name == '#text')):
                        //  mark
                        _result._is__text = true;

                        //  get
                        var _nodeText = _node.nodeValue;

                        //  result
                        _result._length__plain_text = $R.measureText__getTextLength(_nodeText);
                        _result._count__plain_words = $R.measureText__getWordCount(_nodeText);

                        if (_global__inside_link)
                        {
                            _global__length__above_links_text += _result._length__plain_text;
                            _global__count__above_links_words += _result._count__plain_words;
                        }
                        else
                        {
                            _global__length__above_plain_text += _result._length__plain_text;
                            _global__count__above_plain_words += _result._count__plain_words;
                        }

                        //  return text
                        return _result;
                    // 根据链接来判定标题
                    case (_tag_name == 'h1' || _tag_name == 'h2') :
                        if ($R.titlemx) {
                            break;
                        }

                        function tlchild(elem, index) {
                            index = index || 1;
                            elem = (elem.firstChild && elem.firstChild.nodeType != 1) ?
                                tlnext(elem.firstChild) :
                                elem.firstChild;
                            for(var i=1; i < index;i++) {
                                (function() {
                                    return elem = tlnext(elem);
                                })();
                            }
                            return elem;
                        }

                        function tlnext(elem) {
                            do {
                                elem = elem.nextSibling;
                            } while (elem && elem.nodeType != 1);
                            return elem;
                        }

                        var _tltagname_obj = tlchild(_node, 1);
                        if(_tltagname_obj && _tltagname_obj.tagName === 'A') {
                            if ($R.hrefmx == _tltagname_obj.href) {
                                $R.titlemx = _tltagname_obj.textContent;
                            }
                        }

                    //  link
                    //  ====
                    case (_tag_name == 'a'):
                        var _href = _node.href;

                        //  sanity
                        if (_href > ''); else { break; }
                        if (_href.indexOf); else { break; }

                        _result._is__link = true;

                        //  skip
                        for (var i=0, _i=$R.skipStuffFromDomains__links.length; i<_i; i++)
                        {
                            if (_node.href.indexOf($R.skipStuffFromDomains__links[i]) > -1)
                            { _result._is__link_skip = true; break; }
                        }

                        //  inside link
                        if (_global__inside_link); else
                        {
                            _global__inside_link = true;
                            _global__inside_link__element_index = _result.__index;
                        }

                        //  done
                        _return__links.push(_result);
                        break;


                    //  image
                    //  =====
                    case (_tag_name == 'img'):

                        //  skip
                        //  ====
                        if (_node.src && _node.src.indexOf)
                        {
                            for (var i=0, _i=$R.skipStuffFromDomain__images.length; i<_i; i++)
                            {
                                if (_node.src.indexOf($R.skipStuffFromDomain__images[i]) > -1)
                                { _result._is__image_skip = true; break; }
                            }
                        }

                        //  size
                        //  ====
                        var _width = $(_node).width(), _height = $(_node).height();
                        switch (true)
                        {
                            case ((_width * _height) >= 50000):
                            case ((_width >= 350) && (_height >= 75)):
                                _result._is__image_large = true;
                                break;

                            case ((_width * _height) >= 20000):
                            case ((_width >= 150) && (_height >= 150)):
                                _result._is__image_medium = true;
                                break;

                            case ((_width <= 5) && (_height <= 5)):
                                _result._is__image_skip = true;
                                break;

                            default:
                                _result._is__image_small = true;
                                break;
                        }

                        break;
                }


                //  child nodes
                //  ===========
                for (var i=0, _i=_node.childNodes.length; i<_i; i++)
                {
                    var
                        _child = _node.childNodes[i],
                        _child_result = _recursive(_child)
                        ;

                    //  if false, continue
                    //  ==================
                    if (_child_result); else { continue; }


                    //  add to result
                    //  =============
                    _result._count__links +=            _child_result._count__links +           (_child_result._is__link ? 1 : 0);
                    _result._count__links_skip +=       _child_result._count__links_skip +      (_child_result._is__link_skip ? 1 : 0);

                    _result._count__images_small +=     _child_result._count__images_small +    (_child_result._is__image_small ? 1 : 0);
                    _result._count__images_medium +=    _child_result._count__images_medium +   (_child_result._is__image_medium ? 1 : 0);
                    _result._count__images_large +=     _child_result._count__images_large +    (_child_result._is__image_large ? 1 : 0);
                    _result._count__images_skip +=      _child_result._count__images_skip +     (_child_result._is__image_skip ? 1 : 0);

                    _result._count__containers +=       _child_result._count__containers +      (_child_result._is__container ? 1 : 0);
                    _result._count__candidates +=       _child_result._count__candidates +      (_child_result._is__candidate ? 1 : 0);

                    _result._length__all_text +=        _child_result._length__plain_text +     _child_result._length__links_text;
                    _result._count__all_words +=        _child_result._count__plain_words +     _child_result._count__links_words;

                    //  plain text / link text
                    //  ======================
                    switch (true)
                    {
                        case (_child_result._is__link):
                            //  no text to add
                            _result._length__links_text += (_child_result._length__plain_text + _child_result._length__links_text);
                            _result._count__links_words += (_child_result._count__plain_words + _child_result._count__links_words);
                            break;

                        default:
                            _result._length__plain_text +=          _child_result._length__plain_text;
                            _result._count__plain_words +=          _child_result._count__plain_words;
                            _result._length__links_text +=          _child_result._length__links_text;
                            _result._count__links_words +=          _child_result._count__links_words;
                            break;
                    }
                }


                //  after child nodes
                //  =================

                //  mark as not in link anymore
                //  ===========================
                if (true
                    && (_result._is__link)
                    && (_global__inside_link__element_index == _result.__index)
                    ) {
                    _global__inside_link = false;
                    _global__inside_link__element_index = 0;
                }


                //  add to containers
                //  =================
                if (_result._is__container || ((_result.__index == 1) && (_justExploring == true)))
                {
                    //  add to containers
                    _return__containers.push(_result);

                    //  increase above containers
                    if (_result._is__container) { _global__count__above_containers++; }

                    //  add to candidates
                    if (_justExploring); else
                    {
                        switch (true)
                        {
                            case (($R.language != 'cjk') && ((_result._count__links * 2) >= _result._count__plain_words)):  /* link ratio */

                            case (($R.language != 'cjk') && (_result._length__plain_text < (65 / 3))):  /* text length */
                            case (($R.language != 'cjk') && (_result._count__plain_words < 5)):         /* words */

                            case (($R.language == 'cjk') && (_result._length__plain_text < 10)):        /* text length */
                            case (($R.language == 'cjk') && (_result._count__plain_words < 2)):         /* words */


                                //case (_result._length__plain_text == 0):    /* no text */
                                //case (_result._count__plain_words == 0):    /* no words */

                                //case (($R.language == 'cjk') && ((_result._length__plain_text / 65 / 3) < 0.1)):              /* paragrahs of 3 lines */
                                //case (($R.language != 'cjk') && ((_result._count__plain_words / 50) < 0.5)):                  /* paragraphs of 50 words */

                                //  not a valid candidate
                                //if (_tag_name == 'div') { $R.log('bad candidate', _result.__node); }

                                break;

                            default:
                                //  good candidate
                                _result._is__candidate = true;
                                _return__candidates.push(_result);

                                //  increase above candidates
                                _global__count__above_candidates++;

                                break;
                        }

                        //  special case for body -- if it was just skipped
                        //  =====================
                        if ((_result.__index == 1) && !(_result._is__candidate))
                        {
                            _result._is__candidate = true;
                            _result._is__bad = true;
                            _return__candidates.push(_result);
                        }
                    }
                }

                //  return
                //  ======
                return _result;
            };


            //  actually do it
            //  ==============
            _recursive(_nodeToExplore);

            //  just exploring -- return first thing
            //  ==============
            if (_justExploring) { return _return__containers.pop(); }

            //  return containers list
            //  ======================
            return {
                '_containers':  _return__containers,
                '_candidates':  _return__candidates,
                '_links':       _return__links
            };
        };

        $R.getContent__processCandidates = function (_candidatesToProcess)
        {
            //  process this var
            //  ================
            var _candidates = _candidatesToProcess;


            //  sort _candidates -- the lower in the dom, the closer to position 0
            //  ================
            _candidates.sort(function (a, b)
            {
                switch (true)
                {
                    case (a.__index < b.__index): return -1;
                    case (a.__index > b.__index): return 1;
                    default: return 0;
                }
            });


            //  get first
            //  =========
            var _main = _candidates[0]

            //  pieces of text
            //  and points computation
            //  ======================
            for (var i=0, _i=_candidates.length; i<_i; i++)
            {
                //  pieces
                //  ======
                var
                    _count__pieces = 0,
                    _array__pieces = []
                    ;

                for (var k=i, _k=_candidates.length; k<_k; k++)
                {
                    if (_candidates[k]._count__candidates > 0) { continue; }
                    if ($.contains(_candidates[i].__node, _candidates[k].__node)); else { continue; }

                    //  incement pieces count
                    _count__pieces++;
                }


                //  candidate details
                //  =================
                _candidates[i]['__candidate_details'] = $R.getContent__computeDetailsForCandidate(_candidates[i], _main);


                //  pieces -- do this here because _main doesn't yet have a pieces count
                //  ======

                //  set pieces
                _candidates[i]['_count__pieces'] = _count__pieces;
                _candidates[i]['_array__pieces'] = _array__pieces;

                //  pieces ratio
                _candidates[i]['__candidate_details']['_ratio__count__pieces_to_total_pieces'] = (_count__pieces / (_candidates[0]._count__pieces + 1));


                //  check some more
                //  ===============
                /*    switch (true)
                 {
                 case (($R.language != 'cjk') && (_candidates[i]['__candidate_details']['_ratio__length__links_text_to_plain_text'] > 1)):
                 case (($R.language != 'cjk') && (_candidates[i]['__candidate_details']['_ratio__count__links_words_to_plain_words'] > 1)):
                 _candidates[i]._is__bad = true;
                 break;
                 }*/


                //  points
                //  ======
                _candidates[i].__points_history = $R.getContent__computePointsForCandidate(_candidates[i], _main);
                _candidates[i].__points = _candidates[i].__points_history[0];
            }


            //  sort _candidates -- the more points, the closer to position 0
            //  ================
            _candidates.sort(function (a, b)
            {
                switch (true)
                {
                    case (a.__points > b.__points): return -1;
                    case (a.__points < b.__points): return 1;
                    default: return 0;
                }
            });


            //  return
            //  ======
            return _candidates;
        };

        $R.getContent__processCandidatesSecond = function (_processedCandidates)
        {
            var
                _candidates = _processedCandidates,
                _main = _candidates[0]
                ;

            //  only get children of target
            //  ===========================
            _candidates = $.map(_candidates, function (_element, _index)
            {
                switch (true)
                {
                    case (!(_index > 0)):
                    case (!($.contains(_main.__node, _element.__node))):
                        return null;

                    default:
                        return _element;
                }
            });

            //  add main - to amke sure the result is never blank
            _candidates.unshift(_main);


            //  sort _candidates -- the lower in the dom, the closer to position 0
            //  ================
            _candidates.sort(function (a, b)
            {
                switch (true)
                {
                    case (a.__index < b.__index): return -1;
                    case (a.__index > b.__index): return 1;
                    default: return 0;
                }
            });


            //  second candidate computation
            //  ============================
            for (var i=0, _i=_candidates.length; i<_i; i++)
            {
                //  additional numbers
                //  ==================
                _candidates[i].__second_length__above_plain_text = (_candidates[i]._length__above_plain_text - _main._length__above_plain_text);
                _candidates[i].__second_count__above_plain_words = (_candidates[i]._count__above_plain_words - _main._count__above_plain_words);

                //  candidate details
                //  =================
                _candidates[i]['__candidate_details_second'] = $R.getContent__computeDetailsForCandidateSecond(_candidates[i], _main);

                //  check some more
                //  ===============
                /*  switch (true)
                 {
                 case (!(_candidates[i]['__candidate_details_second']['_ratio__count__plain_words_to_total_plain_words'] > 0.05)):
                 case (!(_candidates[i]['__candidate_details_second']['_ratio__length__plain_text_to_total_plain_text'] > 0.05)):

                 //case (!(_candidates[i]['__candidate_details_second']['_ratio__count__above_plain_words_to_total_plain_words'] < 0.1)):
                 //case (!(_candidates[i]['__candidate_details_second']['_ratio__length__above_plain_text_to_total_plain_text'] < 0.1)):

                 //case (_candidates[i]['__candidate_details_second']['_ratio__length__above_plain_text_to_plain_text'] > 1):
                 //case (_candidates[i]['__candidate_details_second']['_ratio__count__above_plain_words_to_plain_words'] > 1):

                 _candidates[i]._is__bad = true;
                 // wil set points to 0, in points computation function
                 break;
                 }*/

                //  points
                //  ======
                _candidates[i].__points_history_second = $R.getContent__computePointsForCandidateSecond(_candidates[i], _main);
                _candidates[i].__points_second = _candidates[i].__points_history_second[0];
            }


            //  sort _candidates -- the more points, the closer to position 0
            //  ================
            _candidates.sort(function (a, b)
            {
                switch (true)
                {
                    case (a.__points_second > b.__points_second): return -1;
                    case (a.__points_second < b.__points_second): return 1;
                    default: return 0;
                }
            });


            //  return
            //  ======
            return _candidates;
        };

        $R.getContent__computePointsForCandidateThird = function (_e, _main)
        {
            var
                _details = _e.__candidate_details,
                _details_second = _e.__candidate_details_second,
                _points_history = []
                ;

            //  bad candidate
            if (_e._is__bad) { return [0]; }


            //  get initial points
            //  ==================
            _points_history.unshift(_e.__points_history[(_e.__points_history.length-1)]);


            //  candidates, containers, pieces
            //  ==============================
            var
                _divide__pieces =     Math.max(2, Math.ceil(_e._count__pieces *     0.25)),
                _divide__candidates = Math.max(2, Math.ceil(_e._count__candidates * 0.25)),
                _divide__containers = Math.max(4, Math.ceil(_e._count__containers * 0.25))
                ;

            _points_history.unshift(((0
                + (_points_history[0] * 3)
                + ((_points_history[0] / _divide__pieces) * 2)
                + ((_points_history[0] / _divide__candidates) * 2)
                + ((_points_history[0] / _divide__containers) * 2)
                ) / 9));


            //  total text
            //  ==========
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - (1 - _details_second._ratio__length__plain_text_to_total_plain_text)), _points_history);
            $R.getContent__computePointsForCandidate__do(0.75, 1, (1 - (1 - _details_second._ratio__count__plain_words_to_total_plain_words)), _points_history);


            //  text above
            //  ==========
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);

            $R.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__count__above_plain_words_to_total_plain_words), _points_history);

            $R.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__length__above_plain_text_to_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__count__above_plain_words_to_plain_words), _points_history);


            //  links inner
            //  ===========
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__links_text_to_all_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_words_to_all_words), _points_history);

            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);

            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_to_plain_words), _points_history);


            //  candidates, containers, pieces
            //  ==============================
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__candidates_to_total_candidates), _points_history);
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__containers_to_total_containers), _points_history);
            $R.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__pieces_to_total_pieces), _points_history);


            //  return -- will get [0] as the actual final points
            //  ======
            return _points_history;
        };

        $R.getContent__buildHTMLForNode = function (_nodeToBuildHTMLFor, _custom_mode)
        {
            var
                _global__element_index = 0,
                _global__the_html = '',
                _global__exploreNodeToBuildHTMLFor = $R.getContent__exploreNodeAndGetStuff(_nodeToBuildHTMLFor, true)
                ;

            //  custom
            //  ======
            switch (_custom_mode)
            {
                case 'above-the-target':
                    _global__exploreNodeToBuildHTMLFor = false;
                    break;
            }

            //  recursive function
            //  ==================
            var _recursive = function (_node)
            {
                //  increment index -- starts with 1
                //  ===============
                _global__element_index++;

                //  vars
                //  ====
                var
                    _explored = false,
                    _tag_name = (_node.nodeType === 3 ? '#text' : ((_node.nodeType === 1 && _node.tagName && _node.tagName > '') ? _node.tagName.toLowerCase() : '#invalid')),
                    _pos__start__before = 0,
                    _pos__start__after = 0,
                    _pos__end__before = 0,
                    _pos__end__after = 0
                    ;

                //  fast return
                //  ===========
                switch (true)
                {
                    case ((_tag_name == '#invalid')):
                    case (($R.parsingOptions._elements_ignore.indexOf('|'+_tag_name+'|') > -1)):
                        return;

                    case (_tag_name == '#text'):
                        _global__the_html += _node.nodeValue
                            .replace(/</gi, '&lt;')
                            .replace(/>/gi, '&gt;')
                        ;
                        return;
                }

                //  hidden
                //  ======
                if ($R.parsingOptions._elements_visible.indexOf('|'+_tag_name+'|') > -1)
                {
                    //  included inline
                    //  _node, _tag_name must be defined
                    //  will return, if node is hidden

                    switch (true)
                    {
                        case (_node.offsetWidth > 0):
                        case (_node.offsetHeight > 0):
                            break;

                        default:
                            switch (true)
                            {
                                case (_node.offsetLeft > 0):
                                case (_node.offsetTop > 0):
                                    break;

                                default:
                                    //  exclude inline DIVs -- which, stupidly, don't have a width/height
                                    if ((_tag_name == 'div') && ((_node.style.display || $.css( _node, "display" )) == 'inline'))
                                    { break; }

                                    //  it's hidden; exit current scope
                                    return;
                            }
                            break;
                    }
                }

                //  clean -- before
                //  =====

                //  just a return will skip the whol element
                //  including children

                //  objects, embeds, iframes
                //  ========================
                switch (_tag_name)
                {
                    case ('object'):
                    case ('embed'):
                    case ('iframe'):
                        var
                            _src = (_tag_name == 'object' ? $(_node).find("param[name='movie']").attr('value') : $(_node).attr('src')),
                            _skip = ((_src > '') ? false : true)
                            ;

                        if (_skip); else
                        {
                            //  default skip
                            _skip = true;

                            //  loop
                            for (var i=0, _i=$R.keepStuffFromDomain__video.length; i<_i; i++)
                            { if (_src.indexOf($R.keepStuffFromDomain__video[i]) > -1) { _skip = false; break; } }
                        }

                        //  skip?
                        if (_skip) {
                            return;
                        }

                        break;
                }

                //  skipped link
                //  ============
                if (_tag_name == 'a' || _tag_name == 'li')
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case (_explored._is__link_skip):
                        case (((_explored._count__images_small + _explored._count__images_skip) > 0) && (_explored._length__plain_text < 65)):
                            return;
                    }
                }

                //  link density
                //  ============
                if ($R.parsingOptions._elements_link_density.indexOf('|'+_tag_name+'|') > -1)
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case (_explored._length__plain_text > (65 * 3 * 2)):
                        case ($R.language == 'cjk' && (_explored._length__plain_text > (65 * 3 * 1))):
                        case (!(_explored._count__links > 1)):
                        case (_global__exploreNodeToBuildHTMLFor && (_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.5):
                        case (_global__exploreNodeToBuildHTMLFor && (_explored._count__plain_words / _global__exploreNodeToBuildHTMLFor._count__plain_words) > 0.5):
                        case ((_explored._length__plain_text == 0) && (_explored._count__links == 1) && (_explored._length__links_text < 65)):
                        case ((_explored._length__plain_text < 25) && ((_explored._count__images_large + _explored._count__images_medium) > 0)):
                            break;

                        case ((_explored._length__links_text / _explored._length__all_text) < 0.5):
                            if (_explored._count__links > 0); else { break; }
                            if (_explored._count__links_skip > 0); else { break; }
                            if (((_explored._count__links_skip / _explored._count__links) > 0.25) && (_explored._length__links_text / _explored._length__all_text) < 0.05) { break; }

                        default:
                            return;
                    }
                }

                //  floating
                //  ========
                if ($R.parsingOptions._elements_floating.indexOf('|'+_tag_name+'|') > -1)
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case (_explored._length__plain_text > (65 * 3 * 2)):
                        case ($R.language == 'cjk' && (_explored._length__plain_text > (65 * 3 * 1))):
                        case (_global__exploreNodeToBuildHTMLFor && (_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.25):
                        case (_global__exploreNodeToBuildHTMLFor && (_explored._count__plain_words / _global__exploreNodeToBuildHTMLFor._count__plain_words) > 0.25):
                        case ((_explored._length__plain_text < 25) && (_explored._length__links_text < 25) && ((_explored._count__images_large + _explored._count__images_medium) > 0)):
                        case (_node.getElementsByTagName && (_explored._length__plain_text < (65 * 3 * 1)) && ((_node.getElementsByTagName('h1').length + _node.getElementsByTagName('h2').length + _node.getElementsByTagName('h3').length + _node.getElementsByTagName('h4').length) > 0)):
                            break;

                        default:
                            var _float = $(_node).css('float');
                            if (_float == 'left' || _float == 'right'); else { break; }
                            if ((_explored._length__links_text == 0) && ((_explored._count__images_large + _explored._count__images_medium) > 0)) { break; }

                            return;
                    }
                }

                //  above target
                //  ============
                if (_custom_mode == 'above-the-target')
                {
                    //  is ignored?
                    if ($R.parsingOptions._elements_above_target_ignore.indexOf('|'+_tag_name+'|') > -1)
                    { return; }

                    //  is image?
                    if (_tag_name == 'img')
                    {
                        _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                        if (_explored._is__image_large); else
                        { return; }
                    }

                    //  has too many links?
                    //if (_node.getElementsByTagName && _node.getElementsByTagName('a').length > 5)
                    //    { $R.debugOutline(_node, 'clean-before', 'above-target'); return; }
                }

                //  headers that are images
                //  =======================
                if (_tag_name.match(/^h(1|2|3|4|5|6)$/gi))
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case ((_explored._length__plain_text < 10) && ((_explored._count__images_small + _explored._count__images_medium + _explored._count__images_large + _explored._count__images_skip) > 0)):
                            return;
                    }
                }


                //  start tag
                //  =========
                if ($R.parsingOptions._elements_ignore_tag.indexOf('|'+_tag_name+'|') > -1); else
                {
                    /* mark */  _pos__start__before = _global__the_html.length;
                    /* add */   _global__the_html += '<'+_tag_name;

                    //  attributes
                    //  ==========

                    //  allowed attributes
                    //  ==================
                    if (_tag_name in $R.parsingOptions._elements_keep_attributes)
                    {
                        for (var i=0, _i=$R.parsingOptions._elements_keep_attributes[_tag_name].length; i<_i; i++)
                        {
                            var
                                _attribute_name = $R.parsingOptions._elements_keep_attributes[_tag_name][i],
                                _attribute_value = _node.getAttribute(_attribute_name)
                                ;

                            //  if present
                            if (_attribute_value > '')
                            { _global__the_html += ' '+_attribute_name+'="'+(_attribute_value)+'"'; }
                        }
                    }

                    //  keep ID for all elements
                    //  ========================
                    var _id_attribute = _node.getAttribute('id');
                    if (_id_attribute > '')
                    { _global__the_html += ' id="'+_id_attribute+'"'; }

                    //  links target NEW
                    //  ================
                    if (_tag_name == 'a')
                    { _global__the_html += ' target="_blank"'; }


                    //  close start
                    //  ===========
                    if ($R.parsingOptions._elements_self_closing.indexOf('|'+_tag_name+'|') > -1) { _global__the_html += ' />'; }
                    else { _global__the_html += '>';}

                    /* mark */ _pos__start__after = _global__the_html.length;
                }

                //  child nodes
                //  ===========
                if ($R.parsingOptions._elements_self_closing.indexOf('|'+_tag_name+'|') > -1); else
                {
                    for (var i=0, _i=_node.childNodes.length; i<_i; i++)
                    { _recursive(_node.childNodes[i]); }
                }

                //  end tag
                //  =======
                switch (true)
                {
                    case (($R.parsingOptions._elements_ignore_tag.indexOf('|'+_tag_name+'|') > -1)):
                        return;

                    case (($R.parsingOptions._elements_self_closing.indexOf('|'+_tag_name+'|') > -1)):
                        /* mark */  _pos__end__before = _global__the_html.length;
                        /* mark */  _pos__end__after = _global__the_html.length;
                        break;

                    default:
                        /* mark */  _pos__end__before = _global__the_html.length;
                        /* end */   _global__the_html += '</'+_tag_name+'>';
                        /* mark */  _pos__end__after = _global__the_html.length;
                        break;
                }

                //  clean -- after
                //  =====

                //  we need to actually cut things out of
                //  "_global__the_html", for stuff to not be there


                //  largeObject classes
                //  ===================
                if (_tag_name == 'iframe' || _tag_name == 'embed' || _tag_name == 'object')
                {
                    _global__the_html = ''
                        + _global__the_html.substr(0, _pos__start__before)
                        + '<div class="readableLargeObjectContainer">'
                        +   _global__the_html.substr(_pos__start__before, (_pos__end__after - _pos__start__before))
                        + '</div>'
                    ;
                    return;
                }

                //  add image classes
                //  =================
                if (_tag_name == 'img')
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case (_explored._is__image_skip):
                            _global__the_html = _global__the_html.substr(0, _pos__start__before);
                            return;

                        case (_explored._is__image_large):

                            //  add float class -- for images too narrow/tall
                            //  remove width/height -- only for large images

                            //  http://www.wired.com/threatlevel/2011/05/gps-gallery/?pid=89&viewall=true
                            //  http://david-smith.org/blog/2012/03/10/ios-5-dot-1-upgrade-stats/index.html
                            //  http://www.turntablekitchen.com/2012/04/dutch-baby-with-caramelized-vanilla-bean-pears-moving-through-the-decades/
                            //class:readableLargeImageContainer update:2012.11.29 wt
                            _global__the_html = ''
                                + _global__the_html.substr(0, _pos__start__before)
                                + '<div class="big-pic-show'
                                +   (($(_node).width() <= 250) && ($(_node).height() >= 250) ? ' img-float' : '')
                                + '">'
                                +   _global__the_html.substr(_pos__start__before, (_pos__end__after - _pos__start__before)).replace(/width="([^=]+?)"/gi, '').replace(/height="([^=]+?)"/gi, '')
                                + '</div>'
                            ;
                            return;
                    }
                }

                //  large images in links
                //  =====================
                if (_tag_name == 'a')
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case (_explored._count__images_large == 1):
                            _global__the_html = ''
                                + _global__the_html.substr(0, _pos__start__after-1)
                                + ' class="readableLinkWithLargeImage">'
                                +   _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                                + '</a>'
                            ;
                            return;

                        case (_explored._count__images_medium == 1):
                            _global__the_html = ''
                                + _global__the_html.substr(0, _pos__start__after-1)
                                + ' class="readableLinkWithMediumImage">'
                                +   _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                                + '</a>'
                            ;
                            return;
                    }
                }

                //  too much content
                //  ================
                if ($R.parsingOptions._elements_too_much_content.indexOf('|'+_tag_name+'|') > -1)
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true)
                    {
                        case (_tag_name == 'h1' && (_explored._length__all_text > (65 * 2))):
                        case (_tag_name == 'h2' && (_explored._length__all_text > (65 * 2 * 3))):
                        case ((_tag_name.match(/^h(3|4|5|6)$/) != null) && (_explored._length__all_text > (65 * 2 * 5))):
                        case ((_tag_name.match(/^(b|i|em|strong)$/) != null) && (_explored._length__all_text > (65 * 5 * 5))):
                            _global__the_html = ''
                                + _global__the_html.substr(0, _pos__start__before)
                                + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                            ;
                            return;
                    }
                }

                //  empty elements
                //  ==============
                switch (true)
                {
                    case (($R.parsingOptions._elements_self_closing.indexOf('|'+_tag_name+'|') > -1)):
                    case (($R.parsingOptions._elements_ignore_tag.indexOf('|'+_tag_name+'|') > -1)):
                    case (_tag_name == 'td'):
                        break;

                    default:
                        var _contents = _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after));
                        _contents = _contents.replace(/(<br \/>)/gi, '');
                        _contents = _contents.replace(/(<hr \/>)/gi, '');

                        //  for rows, clear empty cells
                        if (_tag_name == 'tr')
                        {
                            _contents = _contents.replace(/<td[^>]*?>/gi, '');
                            _contents = _contents.replace(/<\/td>/gi, '');
                        }

                        //  for tables, clear empty rows
                        if (_tag_name == 'table')
                        {
                            _contents = _contents.replace(/<tr[^>]*?>/gi, '');
                            _contents = _contents.replace(/<\/tr>/gi, '');
                        }

                        var _contentsLength = $R.measureText__getTextLength(_contents);

                        switch (true)
                        {
                            case (_contentsLength == 0 && _tag_name == 'p'):
                                _global__the_html = _global__the_html.substr(0, _pos__start__before) + '<br /><br />';
                                return;

                            case (_contentsLength == 0):
                            case ((_contentsLength < 5) && ($R.parsingOptions._elements_visible.indexOf('|'+_tag_name+'|') > -1)):
                                _global__the_html = _global__the_html.substr(0, _pos__start__before);
                                return;
                        }
                        break;
                }

                //  too much missing
                //  ================
                if ($R.parsingOptions._elements_link_density.indexOf('|'+_tag_name+'|') > -1)
                {
                    _explored = (_explored || $R.getContent__exploreNodeAndGetStuff(_node, true));
                    var
                        _contents = _global__the_html
                            .substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                            .replace(/(<([^>]+)>)/gi, ''),
                        _contentsLength = $R.measureText__getTextLength(_contents),
                        _initialLength = 0
                            + _explored._length__all_text
                            + (_explored._count__images_small                   * 10)
                            + (_explored._count__images_skip                    * 10)
                            + (_node.getElementsByTagName('iframe').length      * 10)
                            + (_node.getElementsByTagName('object').length      * 10)
                            + (_node.getElementsByTagName('embed').length       * 10)
                            + (_node.getElementsByTagName('button').length      * 10)
                            + (_node.getElementsByTagName('input').length       * 10)
                            + (_node.getElementsByTagName('select').length      * 10)
                            + (_node.getElementsByTagName('textarea').length    * 10)
                        ;

                    //  too much missing
                    switch (true)
                    {
                        case (!(_contentsLength > 0)):
                        case (!(_initialLength > 0)):
                        case (!((_contentsLength / _initialLength) < 0.5)):
                        case (!(($R.language == 'cjk') && (_contentsLength / _initialLength) < 0.1)):
                        case ((_global__exploreNodeToBuildHTMLFor && ((_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.25))):
                        case (($R.language == 'cjk') && (_global__exploreNodeToBuildHTMLFor && ((_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.1))):
                            break;

                        default:
                            _global__the_html = _global__the_html.substr(0, _pos__start__before);
                            return;
                    }
                }


                //  return
                return;
            };

            //  actually do it
            _recursive(_nodeToBuildHTMLFor);

            //  return html
            return _global__the_html;
        };

        //  length
        //  ======
        $R.measureText__getTextLength = function (_the_text)
        {
            var _text = _the_text;

            _text = _text.replace(/[\s\n\r]+/gi, '');
            //_text = _text.replace(/\d+/, '');

            return _text.length;
        };

        //  word count
        //  ==========
        $R.measureText__getWordCount = function (_the_text)
        {
            var _text = _the_text;

            //  do stuff
            //  ========
            _text = _text.replace(/[\s\n\r]+/gi, ' ');

            _text = _text.replace(/([.,?!:;()\[\]'""-])/gi, ' $1 ');

            _text = _text.replace(/([\u3000])/gi,               '[=words(1)]');
            _text = _text.replace(/([\u3001])/gi,               '[=words(2)]');
            _text = _text.replace(/([\u3002])/gi,               '[=words(4)]');
            _text = _text.replace(/([\u301C])/gi,               '[=words(2)]');
            _text = _text.replace(/([\u2026|\u2025])/gi,        '[=words(2)]');
            _text = _text.replace(/([\u30FB\uFF65])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u300C\u300D])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u300E\u300F])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u3014\u3015])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u3008\u3009])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u300A\u300B])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u3010\u3011])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u3016\u3017])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u3018\u3019])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u301A\u301B])/gi,         '[=words(1)]');
            _text = _text.replace(/([\u301D\u301E\u301F])/gi,   '[=words(1)]');
            _text = _text.replace(/([\u30A0])/gi,               '[=words(1)]');


            //  count
            //  =====
            var
                _count = 0,
                _words_match = _text.match(/([^\s\d]{3,})/gi)
                ;

            //  add match
            _count += (_words_match != null ? _words_match.length : 0);

            //  add manual count
            _text.replace(/\[=words\((\d)\)\]/, function (_match, _plus) { _count += (5 * parseInt(_plus)); });


            //  return
            //  ======
            return _count;
        };

        //  get first page fragment
        //  =======================
        $R.getContent__nextPage__getFirstFragment = function (_html)
        {
            //  remove all tags
            _html = _html.replace(/<[^>]+?>/gi, '');

            //  normalize spaces
            _html = _html.replace(/\s+/gi, ' ');

            //  return first 1000 characters
            return _html.substr(0, 2000);
        };

        /*--test---*/
        // 获取内容在网页上查找
        $R.getContent__findInPage = function (_pageWindow)
        {
            //  calculations
            //  ============

            var
                _firstCandidate = false,
                _secondCandidate = false,
                _targetCandidate = false
                ;

            var _stuff = $R.getContent__exploreNodeAndGetStuff(_pageWindow.document.body);
            var _processedCandidates = $R.getContent__processCandidates(_stuff._candidates);
            _firstCandidate = _processedCandidates[0];
            _targetCandidate = _firstCandidate;

            //  do second?
            switch (true)
            {
                case (!(_firstCandidate._count__containers > 0)):
                case (!(_firstCandidate._count__candidates > 0)):
                case (!(_firstCandidate._count__pieces > 0)):
                case (!(_firstCandidate._count__containers > 25)):
                    break;

                default:

                    var _processedCandidatesSecond = $R.getContent__processCandidatesSecond(_processedCandidates);
                    _secondCandidate = _processedCandidatesSecond[0];

                    //  they're the same
                    if (_firstCandidate.__node == _secondCandidate.__node) { break; }

                    //  compute again
                    //  =============
                    _firstCandidate['__points_history_final'] = $R.getContent__computePointsForCandidateThird(_firstCandidate, _firstCandidate);
                    _firstCandidate['__points_final'] = _firstCandidate.__points_history_final[0];

                    _secondCandidate['__points_history_final'] = $R.getContent__computePointsForCandidateThird(_secondCandidate, _firstCandidate);
                    _secondCandidate['__points_final'] = _secondCandidate.__points_history_final[0];

                    //  are we selecting _second?
                    //  =========================
                    switch (true)
                    {
                        case ((_secondCandidate.__candidate_details._count__lines_of_65_characters < 20) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 1):
                        case ((_secondCandidate.__candidate_details._count__lines_of_65_characters > 20) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 0.9):
                        case ((_secondCandidate.__candidate_details._count__lines_of_65_characters > 50) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 0.75):
                            _targetCandidate = _secondCandidate;
                            break;
                    }

                    break;
            }
            console.log(_targetCandidate);

            //  get html
            //  ========
            var _html = $R.getContent__buildHTMLForNode(_targetCandidate.__node, 'the-target');
            _html = _html.substr((_html.indexOf('>')+1))
            _html = _html.substr(0, _html.lastIndexOf('<'));

            _html = _html.replace(/<(blockquote|div|p|td|li)([^>]*)>(\s*<br \/>)+/gi, '<$1$2>');
            _html = _html.replace(/(<br \/>\s*)+<\/(blockquote|div|p|td|li)>/gi, '</$2>');
            _html = _html.replace(/(<br \/>\s*)+<(blockquote|div|h\d|ol|p|table|ul|li)([^>]*)>/gi, '<$2$3>');
            _html = _html.replace(/<\/(blockquote|div|h\d|ol|p|table|ul|li)>(\s*<br \/>)+/gi, '</$1>');
            _html = _html.replace(/(<hr \/>\s*<hr \/>\s*)+/gi, '<hr />');
            _html = _html.replace(/(<br \/>\s*<br \/>\s*)+/gi, '<br /><br />');

            //  return
            //  ======
            return {
                '_html': _html,
                '_links': _stuff._links,
                '_targetCandidate': _targetCandidate,
                '_firstCandidate': _firstCandidate
            };
        };

        /**
         * 入口函数
         */
        $R.getContent__find = function ()
        {
            //  get content
            //  ===========
            var
                _found = $R.getContent__findInPage($R.win),
                _targetNode = _found._targetCandidate.__node,
                _$targetNode = $(_targetNode),
                _aboveNodes = [];

            //  RTL
            //  ===
            switch (true)
            {
                case (_$targetNode.attr('dir') == 'rtl'):
                case (_$targetNode.css('direction') == 'rtl'):
                    $R.makeRTL();
                    break;
            }

            //  get html
            //  ========
            var
                _foundHTML = _found._html,
                _firstFragmentBefore = $R.getContent__nextPage__getFirstFragment(_foundHTML),
                _documentTitle = ($R.document.title > '' ? $R.document.title : '')
                ;

            //  get title
            //  =========

            //  has title already?
            _foundHTML = $R.getContent__find__isolateTitleInHTML(_foundHTML, _documentTitle);
            $R.articleTitle = $R.getContent__find__getIsolatedTitleInHTML(_foundHTML);

            //  get html above?
            if ($R.articleTitle > ''); else
            {

                //  get html above target?
                //  ======================

                //  global vars:
                //      _found
                //      _foundHTML
                //      _documentTitle
                //      _aboveNodes

                var
                    _prevNode = _found._targetCandidate.__node,
                    _prevHTML = '',
                    _aboveHTML = '',
                    _differentTargets = (_found._firstCandidate.__node != _found._targetCandidate.__node)
                    ;

                (function ()
                {

                    while (true)
                    {
                        //  the end?
                        switch (true)
                        {
                            case (_prevNode.tagName && (_prevNode.tagName.toLowerCase() == 'body')):
                            case (_differentTargets && (_prevNode == _found._firstCandidate.__node)):
                                //  enough is enough
                                return;
                        }

                        //  up or sideways?
                        if (_prevNode.previousSibling); else
                        {
                            _prevNode = _prevNode.parentNode;
                            continue;
                        }

                        //  previous
                        _prevNode = _prevNode.previousSibling;

                        //  get html; add
                        _prevHTML = $R.getContent__buildHTMLForNode(_prevNode, 'above-the-target');
                        _aboveHTML = _prevHTML + _aboveHTML;
                        _aboveNodes.unshift(_prevNode);

                        //  isolate title
                        _aboveHTML = $R.getContent__find__isolateTitleInHTML(_aboveHTML, _documentTitle);

                        //  finished?
                        switch (true)
                        {
                            case ($R.measureText__getTextLength(_aboveHTML.replace(/<[^>]+?>/gi, '').replace(/\s+/gi, ' ')) > (65 * 3 * 3)):
                            case ($R.getContent__find__hasIsolatedTitleInHTML(_aboveHTML)):
                                return;
                        }
                    }

                })();


                //  is what we found any good?
                //  ==========================
                switch (true)
                {
                    case ($R.getContent__find__hasIsolatedTitleInHTML(_aboveHTML)):
                    case (_differentTargets && (_aboveHTML.split('<a ').length < 3) && ($R.measureText__getTextLength(_aboveHTML.replace(/<[^>]+?>/gi, '').replace(/\s+/gi, ' ')) < (65 * 3))):
                        _foundHTML = _aboveHTML + _foundHTML;
                        break;

                    default:
                        _aboveHTML = '';
                        _aboveNodes = [];
                        break;
                }

                $R.articleTitle = $R.getContent__find__getIsolatedTitleInHTML(_foundHTML);

                //  get document title?
                if ($R.articleTitle > ''); else
                {

                    //  if all else failed, get document title
                    //  ======================================

                    //  global vars:
                    //      _foundHTML
                    //      _documentTitle

                    (function ()
                    {
                        //  return?
                        //  =======
                        if (_documentTitle > ''); else { return; }

                        //  vars
                        var
                            _doc_title_parts = [],
                            _doc_title_pregs =
                                [
                                    /( [-][-] |( [-] )|( [>][>] )|( [<][<] )|( [|] )|( [\/] ))/i,
                                    /(([:] ))/i
                                ]
                            ;

                        //  loop through pregs
                        //  ==================
                        for (var i=0, _i=_doc_title_pregs.length; i<_i; i++)
                        {
                            //  split
                            _doc_title_parts = _documentTitle.split(_doc_title_pregs[i]);

                            //  break if we managed a split
                            if (_doc_title_parts.length > 1) { break; }
                        }

                        //  sort title parts -- longer goes higher up -- i.e. towards 0
                        //  ================
                        _doc_title_parts.sort(function (a, b)
                        {
                            switch (true)
                            {
                                case (a.length > b.length): return -1;
                                case (a.length < b.length): return 1;
                                default: return 0;
                            }
                        });

                        //  set title -- first part, if more than one word; otherwise, whole
                        //  =========
                        _foundHTML = ''

                            + $R.articleTitleMarker__start
                            +   (_doc_title_parts[0].split(/\s+/i).length > 1 ? _doc_title_parts[0] : _documentTitle)
                            + $R.articleTitleMarker__end

                            + _foundHTML
                        ;

                    })();
                    $R.articleTitle = $R.getContent__find__getIsolatedTitleInHTML(_foundHTML);
                }
            }

            var _base_url = $('base').attr('href');
            _foundHTML = _foundHTML.replace(/^<div id="articleHeader">[\S\s]*?<\/div>/gi, '');
            if ($R.titlemx === undefined ) {}
            else {
                $R.articleTitle = $R.titlemx;
            }
            return {
                '_html': _foundHTML,
                '_title': $R.articleTitle,
                '_base_url' : _base_url
            }
        };

        return $R.getContent__find();
    },
};


/*
var addPost=function(a){a.$win=$(a.win);a.$document=$(a.document);a.hrefmx=top.window.location.href;a.titlemx=undefined;var b=function(l,k){if(/^https?:\/\//gi.test(l)){return l}var c=k.match(/^https?:\/\/([^\/]+)/gi),j=c[0];if(l.indexOf("/")===0){return j+l}if(l.indexOf("../")===0){var o=l.split("../").length-1,g=k.replace(j,"").split("/"),m=g.length-1,e="",n=m-o;for(var f=0;f<n;f++){if(g[f]){var h=g[f]+"/";e+=h}}return j+"/"+e+l.replace(/..\/+/gi,"")}if(l.indexOf("?")===0){return k+l}var d=k.replace(j,"").split("/");d.pop();return j+d.join("/")+"/"+l};a.parsingOptions={_elements_ignore:"|button|label|input|select|textarea|optgroup|command|datalist|--|frame|frameset|noframes|--|style|link|script|noscript|--|canvas|applet|map|--|marquee|area|base|",_elements_ignore_tag:"|form|fieldset|details|dir|--|center|font|span|",_elements_container:"|body|--|article|section|--|div|--|td|--|li|--|dd|dt|",_elements_self_closing:"|br|hr|--|img|--|col|--|source|--|embed|param|--|iframe|",_elements_visible:"|article|section|--|ul|ol|li|dd|--|table|tr|td|--|div|--|p|--|h1|h2|h3|h4|h5|h6|--|span|",_elements_too_much_content:"|b|i|em|strong|--|h1|h2|h3|h4|h5|--|td|",_elements_link_density:"|div|--|table|ul|ol|--|section|aside|header|",_elements_floating:"|div|--|table|",_elements_above_target_ignore:"|br|--|ul|ol|dl|--|table|",_elements_highlight_protect:"|video|audio|source|--|object|param|embed|",_elements_keep_attributes:{a:["href","title","name"],img:["src","width","height","alt","title"],video:["src","width","height","poster","audio","preload","autoplay","loop","controls"],audio:["src","preload","autoplay","loop","controls"],source:["src","type"],object:["data","type","width","height","classid","codebase","codetype"],param:["name","value"],embed:["src","type","width","height","flashvars","allowscriptaccess","allowfullscreen","bgcolor"],iframe:["src","width","height","frameborder","scrolling"],td:["colspan","rowspan"],th:["colspan","rowspan"]}};a.skipStuffFromDomains__links=["doubleclick.net","fastclick.net","adbrite.com","adbureau.net","admob.com","bannersxchange.com","buysellads.com","impact-ad.jp","atdmt.com","advertising.com","itmedia.jp","microad.jp","serving-sys.com","adplan-ds.com"];a.skipStuffFromDomain__images=["googlesyndication.com","fastclick.net",".2mdn.net","de17a.com","content.aimatch.com","bannersxchange.com","buysellads.com","impact-ad.jp","atdmt.com","advertising.com","itmedia.jp","microad.jp","serving-sys.com","adplan-ds.com"];a.keepStuffFromDomain__video=["youtube.com","youtube-nocookie.com","vimeo.com","hulu.com","yahoo.com","flickr.com","newsnetz.ch","youku.com","56.com","baidu.com","tudou.com"];a.getContent__computeDetailsForCandidate=function(d,h){var g={};if(d._is__bad){return g}g._count__lines_of_65_characters=(d._length__plain_text/65);g._count__paragraphs_of_3_lines=(g._count__lines_of_65_characters/3);g._count__paragraphs_of_5_lines=(g._count__lines_of_65_characters/5);g._count__paragraphs_of_50_words=(d._count__plain_words/50);g._count__paragraphs_of_80_words=(d._count__plain_words/80);g._ratio__length__plain_text_to_total_plain_text=(d._length__plain_text/h._length__plain_text);g._ratio__count__plain_words_to_total_plain_words=(d._count__plain_words/h._count__plain_words);g._ratio__length__links_text_to_plain_text=(d._length__links_text/d._length__plain_text);g._ratio__count__links_words_to_plain_words=(d._count__links_words/d._count__plain_words);g._ratio__length__links_text_to_all_text=(d._length__links_text/d._length__all_text);g._ratio__count__links_words_to_all_words=(d._count__links_words/d._count__all_words);g._ratio__length__links_text_to_total_links_text=(d._length__links_text/(h._length__links_text+1));g._ratio__count__links_words_to_total_links_words=(d._count__links_words/(h._count__links_words+1));g._ratio__count__links_to_total_links=(d._count__links/(h._count__links+1));g._ratio__count__links_to_plain_words=((d._count__links*2)/d._count__plain_words);var e=Math.max(2,Math.ceil(d._count__above_candidates*0.5)),c=((0+(d._length__above_plain_text*1)+(d._length__above_plain_text/e))/2),f=((0+(d._count__above_plain_words*1)+(d._count__above_plain_words/e))/2);g._ratio__length__above_plain_text_to_total_plain_text=(c/h._length__plain_text);g._ratio__count__above_plain_words_to_total_plain_words=(f/h._count__plain_words);g._ratio__count__candidates_to_total_candidates=(d._count__candidates/(h._count__candidates+1));g._ratio__count__containers_to_total_containers=(d._count__containers/(h._count__containers+1));return g};a.getContent__computePointsForCandidate=function(f,c){var k=f.__candidate_details,i=[],h=((c._length__plain_text/65)>250);if(f._is__bad){return[0]}i.unshift(((0+(k._count__paragraphs_of_3_lines)+(k._count__paragraphs_of_5_lines*1.5)+(k._count__paragraphs_of_50_words)+(k._count__paragraphs_of_80_words*1.5)+(f._count__images_large*3)-((f._count__images_skip+f._count__images_small)*0.5))*1000));if(i[0]<0){return[0]}var j=Math.max(5,Math.ceil(f._count__pieces*0.25)),g=Math.max(5,Math.ceil(f._count__candidates*0.25)),d=Math.max(10,Math.ceil(f._count__containers*0.25));i.unshift(((0+(i[0]*3)+(i[0]/j)+(i[0]/g)+(i[0]/d))/6));a.getContent__computePointsForCandidate__do(0.1,2,(1-(1-k._ratio__length__plain_text_to_total_plain_text)),i);a.getContent__computePointsForCandidate__do(0.1,2,(1-(1-k._ratio__count__plain_words_to_total_plain_words)),i);if(h){a.getContent__computePointsForCandidate__do(0.1,4,(1-(1-k._ratio__length__plain_text_to_total_plain_text)),i);a.getContent__computePointsForCandidate__do(0.1,4,(1-(1-k._ratio__count__plain_words_to_total_plain_words)),i)}a.getContent__computePointsForCandidate__do(0.1,5,(1-k._ratio__length__above_plain_text_to_total_plain_text),i);a.getContent__computePointsForCandidate__do(0.1,5,(1-k._ratio__count__above_plain_words_to_total_plain_words),i);if(h){a.getContent__computePointsForCandidate__do(0.1,10,(1-k._ratio__length__above_plain_text_to_total_plain_text),i);a.getContent__computePointsForCandidate__do(0.1,10,(1-k._ratio__count__above_plain_words_to_total_plain_words),i)}a.getContent__computePointsForCandidate__do(0.75,1,(1-k._ratio__length__links_text_to_total_links_text),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-k._ratio__count__links_words_to_total_links_words),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-k._ratio__count__links_to_total_links),i);var e=(a.language=="cjk"?0.75:0.5);a.getContent__computePointsForCandidate__do(e,1,(1-k._ratio__length__links_text_to_plain_text),i);a.getContent__computePointsForCandidate__do(e,1,(1-k._ratio__count__links_words_to_plain_words),i);a.getContent__computePointsForCandidate__do(e,1,(1-k._ratio__length__links_text_to_all_text),i);a.getContent__computePointsForCandidate__do(e,1,(1-k._ratio__count__links_words_to_all_words),i);a.getContent__computePointsForCandidate__do(e,1,(1-k._ratio__count__links_to_plain_words),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-k._ratio__count__candidates_to_total_candidates),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-k._ratio__count__containers_to_total_containers),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-k._ratio__count__pieces_to_total_pieces),i);return i};a.getContent__computeDetailsForCandidateSecond=function(d,h){var g={};if(d._is__bad){return g}g._ratio__length__plain_text_to_total_plain_text=(d._length__plain_text/h._length__plain_text);g._ratio__count__plain_words_to_total_plain_words=(d._count__plain_words/h._count__plain_words);g._ratio__length__links_text_to_all_text=(d._length__links_text/d._length__all_text);g._ratio__count__links_words_to_all_words=(d._count__links_words/d._count__all_words);g._ratio__length__links_text_to_total_links_text=(d._length__links_text/(h._length__links_text+1));g._ratio__count__links_words_to_total_links_words=(d._count__links_words/(h._count__links_words+1));g._ratio__count__links_to_total_links=(d._count__links/(h._count__links+1));g._ratio__count__links_to_plain_words=((d._count__links*2)/d._count__plain_words);var e=Math.max(2,Math.ceil((d._count__above_candidates-h._count__above_candidates)*0.5)),c=((0+(d.__second_length__above_plain_text*1)+(d.__second_length__above_plain_text/e))/2),f=((0+(d.__second_count__above_plain_words*1)+(d.__second_count__above_plain_words/e))/2);g._ratio__length__above_plain_text_to_total_plain_text=(c/h._length__plain_text);g._ratio__count__above_plain_words_to_total_plain_words=(f/h._count__plain_words);g._ratio__length__above_plain_text_to_plain_text=(c/d._length__plain_text);g._ratio__count__above_plain_words_to_plain_words=(f/d._count__plain_words);g._ratio__count__candidates_to_total_candidates=(Math.max(0,(d._count__candidates-(h._count__candidates*0.25)))/(h._count__candidates+1));g._ratio__count__containers_to_total_containers=(Math.max(0,(d._count__containers-(h._count__containers*0.25)))/(h._count__containers+1));g._ratio__count__pieces_to_total_pieces=(Math.max(0,(d._count__pieces-(h._count__pieces*0.25)))/(h._count__pieces+1));return g};a.getContent__computePointsForCandidateSecond=function(g,c){var l=g.__candidate_details,j=g.__candidate_details_second,i=[];if(g._is__bad){return[0]}i.unshift(g.__points_history[(g.__points_history.length-1)]);var k=Math.max(5,Math.ceil(g._count__pieces*0.25)),h=Math.max(5,Math.ceil(g._count__candidates*0.25)),e=Math.max(10,Math.ceil(g._count__containers*0.25));i.unshift(((0+(i[0]*3)+((i[0]/k)*2)+((i[0]/h)*2)+((i[0]/e)*2))/9));a.getContent__computePointsForCandidate__do(0.5,1,(1-(1-j._ratio__length__plain_text_to_total_plain_text)),i);a.getContent__computePointsForCandidate__do(0.5,1,(1-(1-j._ratio__count__plain_words_to_total_plain_words)),i);var d=(a.language=="cjk"?0.5:0.1);a.getContent__computePointsForCandidate__do(d,1,(1-j._ratio__length__above_plain_text_to_total_plain_text),i);a.getContent__computePointsForCandidate__do(d,1,(1-j._ratio__count__above_plain_words_to_total_plain_words),i);a.getContent__computePointsForCandidate__do(d,1,(1-j._ratio__length__above_plain_text_to_plain_text),i);a.getContent__computePointsForCandidate__do(d,1,(1-j._ratio__count__above_plain_words_to_plain_words),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-j._ratio__count__links_to_total_links),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-j._ratio__length__links_text_to_total_links_text),i);a.getContent__computePointsForCandidate__do(0.75,1,(1-j._ratio__count__links_words_to_total_links_words),i);var f=(a.language=="cjk"?0.75:0.5);a.getContent__computePointsForCandidate__do(f,1,(1-l._ratio__length__links_text_to_plain_text),i);a.getContent__computePointsForCandidate__do(f,1,(1-l._ratio__count__links_words_to_plain_words),i);a.getContent__computePointsForCandidate__do(f,1,(1-j._ratio__length__links_text_to_all_text),i);a.getContent__computePointsForCandidate__do(f,1,(1-j._ratio__count__links_words_to_all_words),i);a.getContent__computePointsForCandidate__do(f,1,(1-j._ratio__count__links_to_plain_words),i);a.getContent__computePointsForCandidate__do(0.1,2,(1-j._ratio__count__candidates_to_total_candidates),i);a.getContent__computePointsForCandidate__do(0.1,2,(1-j._ratio__count__containers_to_total_containers),i);a.getContent__computePointsForCandidate__do(0.1,2,(1-j._ratio__count__pieces_to_total_pieces),i);return i};a.getContent__computePointsForCandidate__do=function(f,d,c,h){var e=(h[0]*f),g=(h[0]-e);if(c<0){_points_return=e}else{_points_return=0+e+(g*Math.pow(c,d))}h.unshift(_points_return)};a.getContent__find__hasIsolatedTitleInHTML=function(c){return(c.substr(0,a.articleTitleMarker__start.length)==a.articleTitleMarker__start)};a.getContent__find__getIsolatedTitleInHTML=function(d){if(a.getContent__find__hasIsolatedTitleInHTML(d)){}else{return""}var e=new RegExp(a.articleTitleMarker__start+"(.*?)"+a.articleTitleMarker__end,"i"),c=d.match(e);if(c){}else{return""}return c[1]};a.articleTitleMarker__start='<div id="articleHeader"><h1>';a.articleTitleMarker__end="</h1></div>";a.getContent__find__isolateTitleInHTML=function(e,c){var m=[/<(h1)[^>]*?>([\s\S]+?)<\/\1>/gi,/<(h2)[^>]*?>([\s\S]+?)<\/\1>/gi,/<(h3|h4|h5|h6)[^>]*?>([\s\S]+?)<\/\1>/gi],p="|h2|h3|h4|h5|h6|",t=" "+c.replace(/<[^>]+?>/gi,"").replace(/\s+/gi," ")+" ";for(var s=0,g=m.length;s<g;s++){var u=m[s].exec(e);switch(true){case (!(u)):case (!(m[s].lastIndex>-1)):break;default:var v=m[s].lastIndex,q=(v-u[0].length),h=u[1],l=u[2].replace(/<\s*br[^>]*>/gi,"").replace(/[\n\r]+/gi,""),k=l.replace(/<[^>]+?>/gi,"").replace(/\s+/gi," ");_heading_length=a.measureText__getTextLength(k),_heading_words=[],_to_heading_text=e.substr(0,q),_to_heading_length=a.measureText__getTextLength(_to_heading_text.replace(/<[^>]+?>/gi,"").replace(/\s+/gi," "));switch(true){case (!(_heading_length>5)):case (!(_heading_length<(65*3))):case (!(_to_heading_length<(65*3*2))):break;case ((p.indexOf("|"+h+"|")>-1)):_heading_words=k.split(" ");for(var r=0,d=_heading_words.length,o="";r<d;r++){if(t.indexOf(" "+_heading_words[r]+" ")>-1){o+=_heading_words[r]+" "}}var f=false;switch(true){case ((_heading_length>20)&&(t.indexOf(k)>-1)):case ((_heading_length>10)&&((t.indexOf(k)==1)||(t.indexOf(k)==(t.length-1-k.length)))):f=true;break}var n=false;switch(true){case (f):break;case ((_heading_length>((t.length-2)*2))&&(h!="h2")):case ((_heading_length<Math.ceil((t.length-2)*0.5))):case ((_heading_length<25)&&(o.length<Math.ceil(_heading_length*0.75))):case ((_heading_length<50)&&(o.length<Math.ceil(_heading_length*0.65))):case ((o.length<Math.ceil(_heading_length*0.55))):n=true;break}if(n){break}default:if(a.titlemx){l=a.titlemx}return""+a.articleTitleMarker__start+l+a.articleTitleMarker__end+e.substr(v)}break}}return e};a.sel={};a.getContent__exploreNodeAndGetStuff=function(m,l){var o=0,r=false,n=0,e=0,k=0,j=0,d=0,f=0,q=0,c="",i="",p=[],s=[],h=[];var g=function(G){o++;var t=(G.nodeType===3?"#text":((G.nodeType===1&&G.tagName&&G.tagName>"")?G.tagName.toLowerCase():"#invalid")),A={__index:o,__node:G,_is__container:(a.parsingOptions._elements_container.indexOf("|"+t+"|")>-1),_is__candidate:false,_is__text:false,_is__link:false,_is__link_skip:false,_is__image_small:false,_is__image_medium:false,_is__image_large:false,_is__image_skip:false,_debug__above__plain_text:c,_debug__above__links_text:i,_length__above_plain_text:e,_count__above_plain_words:k,_length__above_links_text:j,_count__above_links_words:d,_length__above_all_text:(e+j),_count__above_all_words:(k+d),_count__above_candidates:f,_count__above_containers:q,_length__plain_text:0,_count__plain_words:0,_length__links_text:0,_count__links_words:0,_length__all_text:0,_count__all_words:0,_count__containers:0,_count__candidates:0,_count__links:0,_count__links_skip:0,_count__images_small:0,_count__images_medium:0,_count__images_large:0,_count__images_skip:0};switch(true){case ((t=="#invalid")):case ((a.parsingOptions._elements_ignore.indexOf("|"+t+"|")>-1)):return;case ((a.parsingOptions._elements_visible.indexOf("|"+t+"|")>-1)):switch(true){case (G.offsetWidth>0):case (G.offsetHeight>0):break;default:switch(true){case (G.offsetLeft>0):case (G.offsetTop>0):break;default:if((t=="div")&&((G.style.display||$.css(G,"display"))=="inline")){break}return}break}break;case (a.parsingOptions._elements_self_closing.indexOf("|"+t+"|")>-1):switch(true){case ((t=="img")):break;default:return}break}switch(true){case ((t=="#text")):A._is__text=true;var C=G.nodeValue;A._length__plain_text=a.measureText__getTextLength(C);A._count__plain_words=a.measureText__getWordCount(C);if(r){j+=A._length__plain_text;d+=A._count__plain_words}else{e+=A._length__plain_text;k+=A._count__plain_words}return A;case (t=="h1"||t=="h2"):if(a.titlemx){break}var D=u(G,1);if(D&&D.tagName==="A"){if(a.hrefmx==D.href){a.titlemx=D.textContent}}function u(J,H){H=H||1;J=(J.firstChild&&J.firstChild.nodeType!=1)?B(J.firstChild):J.firstChild;for(var I=1;I<H;I++){(function(){return J=B(J)})()}return J}function B(H){do{H=H.nextSibling}while(H&&H.nodeType!=1);return H}case (t=="a"):var E=G.href;if(E>""){}else{break}if(E.indexOf){}else{break}A._is__link=true;for(var z=0,y=a.skipStuffFromDomains__links.length;z<y;z++){if(G.href.indexOf(a.skipStuffFromDomains__links[z])>-1){A._is__link_skip=true;break}}if(r){}else{r=true;n=A.__index}h.push(A);break;case (t=="img"):if(G.src&&G.src.indexOf){for(var z=0,y=a.skipStuffFromDomain__images.length;z<y;z++){if(G.src.indexOf(a.skipStuffFromDomain__images[z])>-1){A._is__image_skip=true;break}}}var v=$(G).width(),x=$(G).height();switch(true){case ((v*x)>=50000):case ((v>=350)&&(x>=75)):A._is__image_large=true;break;case ((v*x)>=20000):case ((v>=150)&&(x>=150)):A._is__image_medium=true;break;case ((v<=5)&&(x<=5)):A._is__image_skip=true;break;default:A._is__image_small=true;break}break}for(var z=0,y=G.childNodes.length;z<y;z++){var w=G.childNodes[z],F=g(w);if(F){}else{continue}A._count__links+=F._count__links+(F._is__link?1:0);A._count__links_skip+=F._count__links_skip+(F._is__link_skip?1:0);A._count__images_small+=F._count__images_small+(F._is__image_small?1:0);A._count__images_medium+=F._count__images_medium+(F._is__image_medium?1:0);A._count__images_large+=F._count__images_large+(F._is__image_large?1:0);A._count__images_skip+=F._count__images_skip+(F._is__image_skip?1:0);A._count__containers+=F._count__containers+(F._is__container?1:0);A._count__candidates+=F._count__candidates+(F._is__candidate?1:0);A._length__all_text+=F._length__plain_text+F._length__links_text;A._count__all_words+=F._count__plain_words+F._count__links_words;switch(true){case (F._is__link):A._length__links_text+=(F._length__plain_text+F._length__links_text);A._count__links_words+=(F._count__plain_words+F._count__links_words);break;default:A._length__plain_text+=F._length__plain_text;A._count__plain_words+=F._count__plain_words;A._length__links_text+=F._length__links_text;A._count__links_words+=F._count__links_words;break}}if(true&&(A._is__link)&&(n==A.__index)){r=false;n=0}if(A._is__container||((A.__index==1)&&(l==true))){p.push(A);if(A._is__container){q++}if(l){}else{switch(true){case ((a.language!="cjk")&&((A._count__links*2)>=A._count__plain_words)):case ((a.language!="cjk")&&(A._length__plain_text<(65/3))):case ((a.language!="cjk")&&(A._count__plain_words<5)):case ((a.language=="cjk")&&(A._length__plain_text<10)):case ((a.language=="cjk")&&(A._count__plain_words<2)):break;default:A._is__candidate=true;s.push(A);f++;break}if((A.__index==1)&&!(A._is__candidate)){A._is__candidate=true;A._is__bad=true;s.push(A)}}}return A};g(m);if(l){return p.pop()}return{_containers:p,_candidates:s,_links:h}};a.getContent__processCandidates=function(e){var l=e;l.sort(function(k,i){switch(true){case (k.__index<i.__index):return -1;case (k.__index>i.__index):return 1;default:return 0}});var c=l[0];for(var j=0,h=l.length;j<h;j++){var d=0,m=[];for(var g=j,f=l.length;g<f;g++){if(l[g]._count__candidates>0){continue}if($.contains(l[j].__node,l[g].__node)){}else{continue}d++}l[j]["__candidate_details"]=a.getContent__computeDetailsForCandidate(l[j],c);l[j]["_count__pieces"]=d;l[j]["_array__pieces"]=m;l[j]["__candidate_details"]["_ratio__count__pieces_to_total_pieces"]=(d/(l[0]._count__pieces+1));l[j].__points_history=a.getContent__computePointsForCandidate(l[j],c);l[j].__points=l[j].__points_history[0]}l.sort(function(k,i){switch(true){case (k.__points>i.__points):return -1;case (k.__points<i.__points):return 1;default:return 0}});return l};a.getContent__processCandidatesSecond=function(e){var c=e,g=c[0];c=$.map(c,function(h,i){switch(true){case (!(i>0)):case (!($.contains(g.__node,h.__node))):return null;default:return h}});c.unshift(g);c.sort(function(i,h){switch(true){case (i.__index<h.__index):return -1;case (i.__index>h.__index):return 1;default:return 0}});for(var d=0,f=c.length;d<f;d++){c[d].__second_length__above_plain_text=(c[d]._length__above_plain_text-g._length__above_plain_text);c[d].__second_count__above_plain_words=(c[d]._count__above_plain_words-g._count__above_plain_words);c[d]["__candidate_details_second"]=a.getContent__computeDetailsForCandidateSecond(c[d],g);c[d].__points_history_second=a.getContent__computePointsForCandidateSecond(c[d],g);c[d].__points_second=c[d].__points_history_second[0]}c.sort(function(i,h){switch(true){case (i.__points_second>h.__points_second):return -1;case (i.__points_second<h.__points_second):return 1;default:return 0}});return c};a.getContent__computePointsForCandidateThird=function(d,j){var f=d.__candidate_details,c=d.__candidate_details_second,h=[];if(d._is__bad){return[0]}h.unshift(d.__points_history[(d.__points_history.length-1)]);var i=Math.max(2,Math.ceil(d._count__pieces*0.25)),g=Math.max(2,Math.ceil(d._count__candidates*0.25)),e=Math.max(4,Math.ceil(d._count__containers*0.25));h.unshift(((0+(h[0]*3)+((h[0]/i)*2)+((h[0]/g)*2)+((h[0]/e)*2))/9));a.getContent__computePointsForCandidate__do(0.75,1,(1-(1-c._ratio__length__plain_text_to_total_plain_text)),h);a.getContent__computePointsForCandidate__do(0.75,1,(1-(1-c._ratio__count__plain_words_to_total_plain_words)),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__length__above_plain_text_to_total_plain_text),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__above_plain_words_to_total_plain_words),h);a.getContent__computePointsForCandidate__do(0.1,1,(1-c._ratio__length__above_plain_text_to_total_plain_text),h);a.getContent__computePointsForCandidate__do(0.1,1,(1-c._ratio__count__above_plain_words_to_total_plain_words),h);a.getContent__computePointsForCandidate__do(0.1,1,(1-c._ratio__length__above_plain_text_to_plain_text),h);a.getContent__computePointsForCandidate__do(0.1,1,(1-c._ratio__count__above_plain_words_to_plain_words),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__length__links_text_to_all_text),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__links_words_to_all_words),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__length__links_text_to_plain_text),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__links_words_to_plain_words),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__links_to_plain_words),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__candidates_to_total_candidates),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__containers_to_total_containers),h);a.getContent__computePointsForCandidate__do(0.5,1,(1-f._ratio__count__pieces_to_total_pieces),h);return h};a.getContent__buildHTMLForNode=function(d,h){var f=0,c="",g=a.getContent__exploreNodeAndGetStuff(d,true);switch(h){case"above-the-target":g=false;break}var e=function(p){f++;var v=false,k=(p.nodeType===3?"#text":((p.nodeType===1&&p.tagName&&p.tagName>"")?p.tagName.toLowerCase():"#invalid")),A=0,t=0,n=0,o=0;switch(true){case ((k=="#invalid")):case ((a.parsingOptions._elements_ignore.indexOf("|"+k+"|")>-1)):return;case (k=="#text"):c+=p.nodeValue.replace(/</gi,"&lt;").replace(/>/gi,"&gt;");return}if(a.parsingOptions._elements_visible.indexOf("|"+k+"|")>-1){switch(true){case (p.offsetWidth>0):case (p.offsetHeight>0):break;default:switch(true){case (p.offsetLeft>0):case (p.offsetTop>0):break;default:if((k=="div")&&((p.style.display||$.css(p,"display"))=="inline")){break}return}break}}switch(k){case ("object"):case ("embed"):case ("iframe"):var s=(k=="object"?$(p).find("param[name='movie']").attr("value"):$(p).attr("src")),q=((s>"")?false:true);if(q){}else{q=true;for(var x=0,m=a.keepStuffFromDomain__video.length;x<m;x++){if(s.indexOf(a.keepStuffFromDomain__video[x])>-1){q=false;break}}}if(q){return}break}if(k=="a"||k=="li"){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case (v._is__link_skip):case (((v._count__images_small+v._count__images_skip)>0)&&(v._length__plain_text<65)):return}}if(a.parsingOptions._elements_link_density.indexOf("|"+k+"|")>-1){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case (v._length__plain_text>(65*3*2)):case (a.language=="cjk"&&(v._length__plain_text>(65*3*1))):case (!(v._count__links>1)):case (g&&(v._length__plain_text/g._length__plain_text)>0.5):case (g&&(v._count__plain_words/g._count__plain_words)>0.5):case ((v._length__plain_text==0)&&(v._count__links==1)&&(v._length__links_text<65)):case ((v._length__plain_text<25)&&((v._count__images_large+v._count__images_medium)>0)):break;case ((v._length__links_text/v._length__all_text)<0.5):if(v._count__links>0){}else{break}if(v._count__links_skip>0){}else{break}if(((v._count__links_skip/v._count__links)>0.25)&&(v._length__links_text/v._length__all_text)<0.05){break}default:return}}if(a.parsingOptions._elements_floating.indexOf("|"+k+"|")>-1){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case (v._length__plain_text>(65*3*2)):case (a.language=="cjk"&&(v._length__plain_text>(65*3*1))):case (g&&(v._length__plain_text/g._length__plain_text)>0.25):case (g&&(v._count__plain_words/g._count__plain_words)>0.25):case ((v._length__plain_text<25)&&(v._length__links_text<25)&&((v._count__images_large+v._count__images_medium)>0)):case (p.getElementsByTagName&&(v._length__plain_text<(65*3*1))&&((p.getElementsByTagName("h1").length+p.getElementsByTagName("h2").length+p.getElementsByTagName("h3").length+p.getElementsByTagName("h4").length)>0)):break;default:var u=$(p).css("float");if(u=="left"||u=="right"){}else{break}if((v._length__links_text==0)&&((v._count__images_large+v._count__images_medium)>0)){break}return}}if(h=="above-the-target"){if(a.parsingOptions._elements_above_target_ignore.indexOf("|"+k+"|")>-1){return}if(k=="img"){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));if(v._is__image_large){}else{return}}}if(k.match(/^h(1|2|3|4|5|6)$/gi)){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case ((v._length__plain_text<10)&&((v._count__images_small+v._count__images_medium+v._count__images_large+v._count__images_skip)>0)):return}}if(a.parsingOptions._elements_ignore_tag.indexOf("|"+k+"|")>-1){}else{A=c.length;c+="<"+k;if(k in a.parsingOptions._elements_keep_attributes){for(var x=0,m=a.parsingOptions._elements_keep_attributes[k].length;x<m;x++){var j=a.parsingOptions._elements_keep_attributes[k][x],w=p.getAttribute(j);if(w>""){c+=" "+j+'="'+(w)+'"'}}}var l=p.getAttribute("id");if(l>""){c+=' id="'+l+'"'}if(k=="a"){c+=' target="_blank"'}if(a.parsingOptions._elements_self_closing.indexOf("|"+k+"|")>-1){c+=" />"}else{c+=">"}t=c.length}if(a.parsingOptions._elements_self_closing.indexOf("|"+k+"|")>-1){}else{for(var x=0,m=p.childNodes.length;x<m;x++){e(p.childNodes[x])}}switch(true){case ((a.parsingOptions._elements_ignore_tag.indexOf("|"+k+"|")>-1)):return;case ((a.parsingOptions._elements_self_closing.indexOf("|"+k+"|")>-1)):n=c.length;o=c.length;break;default:n=c.length;c+="</"+k+">";o=c.length;break}if(k=="iframe"||k=="embed"||k=="object"){c=""+c.substr(0,A)+'<div class="readableLargeObjectContainer">'+c.substr(A,(o-A))+"</div>";return}if(k=="img"){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case (v._is__image_skip):c=c.substr(0,A);return;case (v._is__image_large):c=""+c.substr(0,A)+'<div class="big-pic-show'+(($(p).width()<=250)&&($(p).height()>=250)?" img-float":"")+'">'+c.substr(A,(o-A)).replace(/width="([^=]+?)"/gi,"").replace(/height="([^=]+?)"/gi,"")+"</div>";return}}if(k=="a"){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case (v._count__images_large==1):c=""+c.substr(0,t-1)+' class="readableLinkWithLargeImage">'+c.substr(t,(n-t))+"</a>";return;case (v._count__images_medium==1):c=""+c.substr(0,t-1)+' class="readableLinkWithMediumImage">'+c.substr(t,(n-t))+"</a>";return}}if(a.parsingOptions._elements_too_much_content.indexOf("|"+k+"|")>-1){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));switch(true){case (k=="h1"&&(v._length__all_text>(65*2))):case (k=="h2"&&(v._length__all_text>(65*2*3))):case ((k.match(/^h(3|4|5|6)$/)!=null)&&(v._length__all_text>(65*2*5))):case ((k.match(/^(b|i|em|strong)$/)!=null)&&(v._length__all_text>(65*5*5))):c=""+c.substr(0,A)+c.substr(t,(n-t));return}}switch(true){case ((a.parsingOptions._elements_self_closing.indexOf("|"+k+"|")>-1)):case ((a.parsingOptions._elements_ignore_tag.indexOf("|"+k+"|")>-1)):case (k=="td"):break;default:var z=c.substr(t,(n-t));z=z.replace(/(<br \/>)/gi,"");z=z.replace(/(<hr \/>)/gi,"");if(k=="tr"){z=z.replace(/<td[^>]*?>/gi,"");z=z.replace(/<\/td>/gi,"")}if(k=="table"){z=z.replace(/<tr[^>]*?>/gi,"");z=z.replace(/<\/tr>/gi,"")}var r=a.measureText__getTextLength(z);switch(true){case (r==0&&k=="p"):c=c.substr(0,A)+"<br /><br />";return;case (r==0):case ((r<5)&&(a.parsingOptions._elements_visible.indexOf("|"+k+"|")>-1)):c=c.substr(0,A);return}break}if(a.parsingOptions._elements_link_density.indexOf("|"+k+"|")>-1){v=(v||a.getContent__exploreNodeAndGetStuff(p,true));var z=c.substr(t,(n-t)).replace(/(<([^>]+)>)/gi,""),r=a.measureText__getTextLength(z),y=0+v._length__all_text+(v._count__images_small*10)+(v._count__images_skip*10)+(p.getElementsByTagName("iframe").length*10)+(p.getElementsByTagName("object").length*10)+(p.getElementsByTagName("embed").length*10)+(p.getElementsByTagName("button").length*10)+(p.getElementsByTagName("input").length*10)+(p.getElementsByTagName("select").length*10)+(p.getElementsByTagName("textarea").length*10);switch(true){case (!(r>0)):case (!(y>0)):case (!((r/y)<0.5)):case (!((a.language=="cjk")&&(r/y)<0.1)):case ((g&&((v._length__plain_text/g._length__plain_text)>0.25))):case ((a.language=="cjk")&&(g&&((v._length__plain_text/g._length__plain_text)>0.1))):break;default:c=c.substr(0,A);return}}return};e(d);return c};a.measureText__getTextLength=function(c){var d=c;d=d.replace(/[\s\n\r]+/gi,"");return d.length};a.measureText__getWordCount=function(d){var e=d;e=e.replace(/[\s\n\r]+/gi," ");e=e.replace(/([.,?!:;()\[\]'""-])/gi," $1 ");e=e.replace(/([\u3000])/gi,"[=words(1)]");e=e.replace(/([\u3001])/gi,"[=words(2)]");e=e.replace(/([\u3002])/gi,"[=words(4)]");e=e.replace(/([\u301C])/gi,"[=words(2)]");e=e.replace(/([\u2026|\u2025])/gi,"[=words(2)]");e=e.replace(/([\u30FB\uFF65])/gi,"[=words(1)]");e=e.replace(/([\u300C\u300D])/gi,"[=words(1)]");e=e.replace(/([\u300E\u300F])/gi,"[=words(1)]");e=e.replace(/([\u3014\u3015])/gi,"[=words(1)]");e=e.replace(/([\u3008\u3009])/gi,"[=words(1)]");e=e.replace(/([\u300A\u300B])/gi,"[=words(1)]");e=e.replace(/([\u3010\u3011])/gi,"[=words(1)]");e=e.replace(/([\u3016\u3017])/gi,"[=words(1)]");e=e.replace(/([\u3018\u3019])/gi,"[=words(1)]");e=e.replace(/([\u301A\u301B])/gi,"[=words(1)]");e=e.replace(/([\u301D\u301E\u301F])/gi,"[=words(1)]");e=e.replace(/([\u30A0])/gi,"[=words(1)]");var c=0,f=e.match(/([^\s\d]{3,})/gi);c+=(f!=null?f.length:0);e.replace(/\[=words\((\d)\)\]/,function(h,g){c+=(5*parseInt(g))});return c};a.getContent__nextPage__getFirstFragment=function(c){c=c.replace(/<[^>]+?>/gi,"");c=c.replace(/\s+/gi," ");return c.substr(0,2000)};a.getContent__findInPage=function(j){var g=false,i=false,c=false;var f=a.getContent__exploreNodeAndGetStuff(j.document.body);var h=a.getContent__processCandidates(f._candidates);g=h[0];c=g;switch(true){case (!(g._count__containers>0)):case (!(g._count__candidates>0)):case (!(g._count__pieces>0)):case (!(g._count__containers>25)):break;default:var d=a.getContent__processCandidatesSecond(h);i=d[0];if(g.__node==i.__node){break}g.__points_history_final=a.getContent__computePointsForCandidateThird(g,g);g.__points_final=g.__points_history_final[0];i.__points_history_final=a.getContent__computePointsForCandidateThird(i,g);i.__points_final=i.__points_history_final[0];switch(true){case ((i.__candidate_details._count__lines_of_65_characters<20)&&(i.__points_final/g.__points_final)>1):case ((i.__candidate_details._count__lines_of_65_characters>20)&&(i.__points_final/g.__points_final)>0.9):case ((i.__candidate_details._count__lines_of_65_characters>50)&&(i.__points_final/g.__points_final)>0.75):c=i;break}break}console.log(c);var e=a.getContent__buildHTMLForNode(c.__node,"the-target");e=e.substr((e.indexOf(">")+1));e=e.substr(0,e.lastIndexOf("<"));e=e.replace(/<(blockquote|div|p|td|li)([^>]*)>(\s*<br \/>)+/gi,"<$1$2>");e=e.replace(/(<br \/>\s*)+<\/(blockquote|div|p|td|li)>/gi,"</$2>");e=e.replace(/(<br \/>\s*)+<(blockquote|div|h\d|ol|p|table|ul|li)([^>]*)>/gi,"<$2$3>");e=e.replace(/<\/(blockquote|div|h\d|ol|p|table|ul|li)>(\s*<br \/>)+/gi,"</$1>");e=e.replace(/(<hr \/>\s*<hr \/>\s*)+/gi,"<hr />");e=e.replace(/(<br \/>\s*<br \/>\s*)+/gi,"<br /><br />");return{_html:e,_links:f._links,_targetCandidate:c,_firstCandidate:g}};a.getContent__find=function(){var f=a.getContent__findInPage(a.win),k=f._targetCandidate.__node,d=$(k),h=[];switch(true){case (d.attr("dir")=="rtl"):case (d.css("direction")=="rtl"):a.makeRTL();break}var e=f._html,l=a.getContent__nextPage__getFirstFragment(e),c=(a.document.title>""?a.document.title:"");e=a.getContent__find__isolateTitleInHTML(e,c);a.articleTitle=a.getContent__find__getIsolatedTitleInHTML(e);if(a.articleTitle>""){}else{var g=f._targetCandidate.__node,m="",j="",i=(f._firstCandidate.__node!=f._targetCandidate.__node);(function(){while(true){switch(true){case (g.tagName&&(g.tagName.toLowerCase()=="body")):case (i&&(g==f._firstCandidate.__node)):return}if(g.previousSibling){}else{g=g.parentNode;continue}g=g.previousSibling;m=a.getContent__buildHTMLForNode(g,"above-the-target");j=m+j;h.unshift(g);j=a.getContent__find__isolateTitleInHTML(j,c);switch(true){case (a.measureText__getTextLength(j.replace(/<[^>]+?>/gi,"").replace(/\s+/gi," "))>(65*3*3)):case (a.getContent__find__hasIsolatedTitleInHTML(j)):return}}})();switch(true){case (a.getContent__find__hasIsolatedTitleInHTML(j)):case (i&&(j.split("<a ").length<3)&&(a.measureText__getTextLength(j.replace(/<[^>]+?>/gi,"").replace(/\s+/gi," "))<(65*3))):e=j+e;break;default:j="";h=[];break}a.articleTitle=a.getContent__find__getIsolatedTitleInHTML(e);if(a.articleTitle>""){}else{(function(){if(c>""){}else{return}var o=[],r=[/( [-][-] |( [-] )|( [>][>] )|( [<][<] )|( [|] )|( [\/] ))/i,/(([:] ))/i];for(var p=0,q=r.length;p<q;p++){o=c.split(r[p]);if(o.length>1){break}}o.sort(function(t,s){switch(true){case (t.length>s.length):return -1;case (t.length<s.length):return 1;default:return 0}});e=""+a.articleTitleMarker__start+(o[0].split(/\s+/i).length>1?o[0]:c)+a.articleTitleMarker__end+e})();a.articleTitle=a.getContent__find__getIsolatedTitleInHTML(e)}}var n=$("base").attr("href");e=e.replace(/^<div id="articleHeader">[\S\s]*?<\/div>/gi,"");if(a.titlemx===undefined){}else{a.articleTitle=a.titlemx}return{_html:e,_title:a.articleTitle,_base_url:n}};return a.getContent__find()};

window.$nvguiyujing.win = window;
window.$nvguiyujing.document = window.document;
$R = window.$nvguiyujing;
var page = addPost($R);             // 会产生一个对象。有性趣就自己 consloe.log 看看。
urlSr = window.location.href;
page._url = urlSr;



'https://reader.mx/accounts/isLogged' 判断用户是否登录的接口，返回JSON数据。
    {"logged": "true"} 表示已经登录。
    {"logged": "false"} 表示木有登录。

'https://reader.mx/accounts/login?next=' 如果没登录可以跳到这里登录，next 可以接登录之后跳转的地址。


'https://reader.mx/collect/insertData'  插入已经抓取的数据。
    content：文章的内容
    title：文章的标题
    url：文章的URL
    base_url：文章来源页面的 base。

    */
