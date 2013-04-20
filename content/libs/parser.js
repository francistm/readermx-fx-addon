if(typeof ReaderMX == "undefined") {
    var ReaderMX = {};
}

ReaderMX.Lib = {

    "addPost" : function ($R) {
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
    }
};
