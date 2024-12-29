export const getRegistrationTemplate = (data) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>register 2</title>
    <!--[if (mso 16)]>
    <style type="text/css">
        a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
    <style type="text/css">
        body {
            width: 100%;
            font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            padding: 0;
            margin: 0;
            background-color: #F6F6F6;
            color: #333333;
        }
        .es-wrapper-color {
            background-color: #F6F6F6;
        }
        .es-header-body, .es-content-body, .es-footer-body {
            background-color: #FFFFFF;
        }
        .es-content-body p, .es-content-body a {
            color: #333333;
        }
        .es-button {
            background: #1d77ff;
            color: #f6f6f6;
            text-decoration: none;
            padding: 10px 30px;
            border-radius: 0px;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #171829;
                color: #FFFFFF;
            }
            .es-wrapper-color {
                background-color: #171829;
            }
            .es-header-body, .es-content-body, .es-footer-body {
                background-color: #171829;
            }
            .es-content-body p, .es-content-body a {
                color: #FFFFFF;
            }
            .es-button {
                background: #1d77ff;
                color: #f6f6f6;
            }
        }
        #outlook a {
            padding: 0;
        }
        .es-button {
            mso-style-priority: 100!important;
            text-decoration: none!important;
        }
        a[x-apple-data-detectors] {
            color: inherit!important;
            text-decoration: none!important;
            font-size: inherit!important;
            font-family: inherit!important;
            font-weight: inherit!important;
            line-height: inherit!important;
        }
        .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
        }
        @media only screen and (max-width:600px) {
            p, ul li, ol li, a {
                line-height: 150%!important
            }
            h1, h2, h3, h1 a, h2 a, h3 a {
                line-height: 150%!important
            }
            h1 {
                font-size: 40px!important;
                text-align: left
            }
            h2 {
                font-size: 28px!important;
                text-align: left
            }
            h3 {
                font-size: 20px!important;
                text-align: left
            }
            .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
                font-size: 40px!important;
                text-align: left
            }
            .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
                font-size: 28px!important;
                text-align: left
            }
            .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
                font-size: 20px!important;
                text-align: left
            }
            .es-menu td a {
                font-size: 14px!important
            }
            .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {
                font-size: 14px!important
            }
            .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {
                font-size: 14px!important
            }
            .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {
                font-size: 14px!important
            }
            .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {
                font-size: 12px!important
            }
            *[class="gmail-fix"] {
                display: none!important
            }
            .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {
                text-align: center!important
            }
            .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {
                text-align: right!important
            }
            .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {
                text-align: left!important
            }
            .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {
                display: inline!important
            }
            .es-button-border {
                display: inline-block!important
            }
            a.es-button, button.es-button {
                font-size: 18px!important;
                display: inline-block!important
            }
            .es-adaptive table, .es-left, .es-right {
                width: 100%!important
            }
            .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {
                width: 100%!important;
                max-width: 600px!important
            }
            .es-adapt-td {
                display: block!important;
                width: 100%!important
            }
            .adapt-img {
                width: 100%!important;
                height: auto!important
            }
            .es-m-p0 {
                padding: 0!important
            }
            .es-m-p0r {
                padding-right: 0!important
            }
            .es-m-p0l {
                padding-left: 0!important
            }
            .es-m-p0t {
                padding-top: 0!important
            }
            .es-m-p0b {
                padding-bottom: 0!important
            }
            .es-m-p20b {
                padding-bottom: 20px!important
            }
            .es-mobile-hidden, .es-hidden {
                display: none!important
            }
            tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {
                width: auto!important;
                overflow: visible!important;
                float: none!important;
                max-height: inherit!important;
                line-height: inherit!important
            }
            tr.es-desk-hidden {
                display: table-row!important
            }
            table.es-desk-hidden {
                display: table!important
            }
            td.es-desk-menu-hidden {
                display: table-cell!important
            }
            table.es-table-not-adapt, .esd-block-html table {
                width: auto!important
            }
            table.es-social {
                display: inline-block!important
            }
            table.es-social td {
                display: inline-block!important
            }
            .es-desk-hidden {
                display: table-row!important;
                width: auto!important;
                overflow: visible!important;
                max-height: inherit!important
            }
            .es-m-p5 {
                padding: 5px!important
            }
            .es-m-p5t {
                padding-top: 5px!important
            }
            .es-m-p5b {
                padding-bottom: 5px!important
            }
            .es-m-p5r {
                padding-right: 5px!important
            }
            .es-m-p5l {
                padding-left: 5px!important
            }
            .es-m-p10 {
                padding: 10px!important
            }
            .es-m-p10t {
                padding-top: 10px!important
            }
            .es-m-p10b {
                padding-bottom: 10px!important
            }
            .es-m-p10r {
                padding-right: 10px!important
            }
            .es-m-p10l {
                padding-left: 10px!important
            }
            .es-m-p15 {
                padding: 15px!important
            }
            .es-m-p15t {
                padding-top: 15px!important
            }
            .es-m-p15b {
                padding-bottom: 15px!important
            }
            .es-m-p15r {
                padding-right: 15px!important
            }
            .es-m-p15l {
                padding-left: 15px!important
            }
            .es-m-p20 {
                padding: 20px!important
            }
            .es-m-p20t {
                padding-top: 20px!important
            }
            .es-m-p20b {
                padding-bottom: 20px!important
            }
            .es-m-p20r {
                padding-right: 20px!important
            }
            .es-m-p20l {
                padding-left: 20px!important
            }
            .es-m-p25 {
                padding: 25px!important
            }
            .es-m-p25t {
                padding-top: 25px!important
            }
            .es-m-p25b {
                padding-bottom: 25px!important
            }
            .es-m-p25r {
                padding-right: 25px!important
            }
            .es-m-p25l {
                padding-left: 25px!important
            }
            .es-m-p30 {
                padding: 30px!important
            }
            .es-m-p30t {
                padding-top: 30px!important
            }
            .es-m-p30b {
                padding-bottom: 30px!important
            }
            .es-m-p30r {
                padding-right: 30px!important
            }
            .es-m-p30l {
                padding-left: 30px!important
            }
            .es-m-p35 {
                padding: 35px!important
            }
            .es-m-p35t {
                padding-top: 35px!important
            }
            .es-m-p35b {
                padding-bottom: 35px!important
            }
            .es-m-p35r {
                padding-right: 35px!important
            }
            .es-m-p35l {
                padding-left: 35px!important
            }
            .es-m-p40 {
                padding: 40px!important
            }
            .es-m-p40t {
                padding-top: 40px!important
            }
            .es-m-p40b {
                padding-bottom: 40px!important
            }
            .es-m-p40r {
                padding-right: 40px!important
            }
            .es-m-p40l {
                padding-left: 40px!important
            }
        }
        @media screen and (max-width:384px) {
            .mail-message-content {
                width: 414px!important
            }
        }
    </style>
</head>
<body>
<div dir="ltr" class="es-wrapper-color" lang="en">
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none">
        <tr>
            <td valign="top">
                <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none">
                    <tr>
                        <td align="center">
                            <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#171829" align="center" role="none" style="background-color:#171829;width:600px">
                                <tr>
                                    <td align="left" bgcolor="#171829">
                                        <table cellspacing="0" cellpadding="0" width="100%" role="none">
                                            <tr>
                                                <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://eifdhct.stripocdn.email/content/guids/CABINET_95aa5a818919054268dc9f774d33b349fa4ca220a522a389d4198e4d62e24c76/images/group_34916.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="52"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none">
                    <tr>
                        <td align="center">
                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#171829" align="center" role="none" style="background-color:#171829;width:600px">
                                <tr>
                                    <td align="left" style="padding:0;Margin:0">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none">
                                            <tr>
                                                <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;position:relative"><img class="adapt-img" src="https://eifdhct.stripocdn.email/content/guids/bannerImgGuid/images/image17133702262321558.png" alt title width="600" height="226" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:10px;padding-bottom:30px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px">Dear ${data.name},</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px">&nbsp;Thank you for registering with Templeton!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px">We're excited to have you on board!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px">Your account has been successfully created, and you can now start exploring our platform.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px">Start easily finding your perfect beat by genre, BPM, price, mood, key, etc.</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;padding-bottom:20px"><!--[if mso]><a href="https://digiwaysite.tech" target="_blank" hidden>
                                                                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://digiwaysite.tech"
                                                                             style="height:39px; v-text-anchor:middle; width:181px" arcsize="0%" stroke="f"  fillcolor="#1d77ff">
                                                                    <w:anchorlock></w:anchorlock>
                                                                    <center style='color:#f6f6f6; font-family:lato, "helvetica neue", helvetica, arial, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px'>Explore Tracks</center>
                                                                </v:roundrect></a>
                                                                <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#1d77ff;border-width:0px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a href="https://digiwaysite.tech" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#f6f6f6;font-size:16px;display:inline-block;background:#1d77ff;border-radius:0px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;padding:10px 30px 10px 30px;mso-padding-alt:0;mso-border-alt:10px solid #1d77ff">Explore Tracks</a></span><!--<![endif]--></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="es-m-p0r es-m-p0l" style="padding:0;Margin:0;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#FFFFFF;font-size:16px">Please keep your login credentials secure.</p></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none">
                    <tr>
                        <td align="center">
                            <table bgcolor="#1d1d1d" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="background-color:#1d1d1d;width:600px">
                                <tr>
                                    <td class="es-m-p0r" align="left" bgcolor="#171829" style="padding:0;Margin:0;padding-right:20px;background-color:#171829">
                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="float:right">
                                            <tr>
                                                <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:290px">
                                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                        <tr>
                                                            <td align="left" class="es-m-txt-c es-m-p20r es-m-p20l" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#f6f6f6;font-size:16px">&nbsp;If you have any questions or need assistance, please contact our support team at [<a target="_blank" href="mailto:yana@digiway.dev" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#6fa8dc;font-size:16px">yana@digiway.dev</a>].&nbsp;</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#FFFFFF;font-size:20px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#FFFFFF;font-size:20px">Best regards,</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#FFFFFF;font-size:20px">The TEMLETON Team</p></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="float:left">
                                            <tr>
                                                <td align="left" style="padding:0;Margin:0;width:270px">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="background-color:#171829" bgcolor="#171829" role="presentation">
                                                        <tr class="es-mobile-hidden">
                                                            <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://digiwaysite.tech" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FCA311;font-size:20px"><img class="adapt-img" src="https://eifdhct.stripocdn.email/content/guids/CABINET_95aa5a818919054268dc9f774d33b349fa4ca220a522a389d4198e4d62e24c76/images/group_34917_1_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="270" height="193"></a></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none">
                    <tr>
                        <td align="center">
                            <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#171829" align="center" role="none" style="background-color:#171829;width:600px">
                                <tr>
                                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                        <table cellspacing="0" cellpadding="0" width="100%" role="none">
                                            <tr>
                                                <td align="left" style="padding:0;Margin:0;width:560px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">Copyright © 2024 Temleton, All rights reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><a target="_blank" href="https://digiwaysite.tech/terms-conditions/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#6fa8dc;font-size:14px">Terms of Service </a>| <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#6fa8dc;font-size:14px" href="https://digiwaysite.tech/privacy-policy/">Privacy Policy</a></p></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
</body>
</html>

    `;
};
