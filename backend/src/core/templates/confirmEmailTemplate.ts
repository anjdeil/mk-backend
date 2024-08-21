export const getConfirmEmailTemplate = (data) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>register 1</title><!--[if (mso 16)]>
    <style type="text/css">
        a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
        :root {
            --bg-color: #F6F6F6;
            --text-color: #000000;
            --link-color: #1d77ff;
            --button-bg-color: #1d77ff;
            --button-text-color: #f6f6f6;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #171829;
                --text-color: #f6f6f6;
                --link-color: #9fc5e8;
                --button-bg-color: #1d77ff;
                --button-text-color: #f6f6f6;
            }
        }

        body {
            width: 100%;
            font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            padding: 0;
            margin: 0;
            background-color: var(--bg-color);
            color: var(--text-color);
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
                line-height: 150%!important;
            }
            h1, h2, h3, h1 a, h2 a, h3 a {
                line-height: 150%!important;
            }
            h1 {
                font-size: 40px!important;
                text-align: left;
            }
            h2 {
                font-size: 28px!important;
                text-align: left;
            }
            h3 {
                font-size: 20px!important;
                text-align: left;
            }
            .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
                font-size: 40px!important;
                text-align: left;
            }
            .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
                font-size: 28px!important;
                text-align: left;
            }
            .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
                font-size: 20px!important;
                text-align: left;
            }
            .es-menu td a {
                font-size: 14px!important;
            }
            .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {
                font-size: 14px!important;
            }
            .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {
                font-size: 14px!important;
            }
            .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {
                font-size: 14px!important;
            }
            .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {
                font-size: 12px!important;
            }
            *[class="gmail-fix"] {
                display: none!important;
            }
            .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {
                text-align: center!important;
            }
            .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {
                text-align: right!important;
            }
            .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {
                text-align: left!important;
            }
            .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {
                display: inline!important;
            }
            .es-button-border {
                display: inline-block!important;
            }
            a.es-button, button.es-button {
                font-size: 18px!important;
                display: inline-block!important;
            }
            .es-adaptive table, .es-left, .es-right {
                width: 100%!important;
            }
            .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {
                width: 100%!important;
                max-width: 600px!important;
            }
            .es-adapt-td {
                display: block!important;
                width: 100%!important;
            }
            .adapt-img {
                width: 100%!important;
                height: auto!important;
            }
            .es-m-p0 {
                padding: 0!important;
            }
            .es-m-p0r {
                padding-right: 0!important;
            }
            .es-m-p0l {
                padding-left: 0!important;
            }
            .es-m-p0t {
                padding-top: 0!important;
            }
            .es-m-p0b {
                padding-bottom: 0!important;
            }
            .es-m-p20b {
                padding-bottom: 20px!important;
            }
            .es-mobile-hidden, .es-hidden {
                display: none!important;
            }
            tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {
                width: auto!important;
                overflow: visible!important;
                float: none!important;
                max-height: inherit!important;
                line-height: inherit!important;
            }
            tr.es-desk-hidden {
                display: table-row!important;
            }
            table.es-desk-hidden {
                display: table!important;
            }
            td.es-desk-menu-hidden {
                display: table-cell!important;
            }
            .es-menu td {
                width: 1%!important;
            }
            table.es-table-not-adapt, .esd-block-html table {
                width: auto!important;
            }
            table.es-social {
                display: inline-block!important;
            }
            table.es-social td {
                display: inline-block!important;
            }
            .es-desk-hidden {
                display: table-row!important;
                width: auto!important;
                overflow: visible!important;
                max-height: inherit!important;
            }
            .es-m-p5 {
                padding: 5px!important;
            }
            .es-m-p5t {
                padding-top: 5px!important;
            }
            .es-m-p5b {
                padding-bottom: 5px!important;
            }
            .es-m-p5r {
                padding-right: 5px!important;
            }
            .es-m-p5l {
                padding-left: 5px!important;
            }
            .es-m-p10 {
                padding: 10px!important;
            }
            .es-m-p10t {
                padding-top: 10px!important;
            }
            .es-m-p10b {
                padding-bottom: 10px!important;
            }
            .es-m-p10r {
                padding-right: 10px!important;
            }
            .es-m-p10l {
                padding-left: 10px!important;
            }
            .es-m-p15 {
                padding: 15px!important;
            }
            .es-m-p15t {
                padding-top: 15px!important;
            }
            .es-m-p15b {
                padding-bottom: 15px!important;
            }
            .es-m-p15r {
                padding-right: 15px!important;
            }
            .es-m-p15l {
                padding-left: 15px!important;
            }
            .es-m-p20 {
                padding: 20px!important;
            }
            .es-m-p20t {
                padding-top: 20px!important;
            }
            .es-m-p20b {
                padding-bottom: 20px!important;
            }
            .es-m-p20r {
                padding-right: 20px!important;
            }
            .es-m-p20l {
                padding-left: 20px!important;
            }
            .es-m-p25 {
                padding: 25px!important;
            }
            .es-m-p25t {
                padding-top: 25px!important;
            }
            .es-m-p25b {
                padding-bottom: 25px!important;
            }
            .es-m-p25r {
                padding-right: 25px!important;
            }
            .es-m-p25l {
                padding-left: 25px!important;
            }
            .es-m-p30 {
                padding: 30px!important;
            }
            .es-m-p30t {
                padding-top: 30px!important;
            }
            .es-m-p30b {
                padding-bottom: 30px!important;
            }
            .es-m-p30r {
                padding-right: 30px!important;
            }
            .es-m-p30l {
                padding-left: 30px!important;
            }
            .es-m-p35 {
                padding: 35px!important;
            }
            .es-m-p35t {
                padding-top: 35px!important;
            }
            .es-m-p35b {
                padding-bottom: 35px!important;
            }
            .es-m-p35r {
                padding-right: 35px!important;
            }
            .es-m-p35l {
                padding-left: 35px!important;
            }
            .es-m-p40 {
                padding: 40px!important;
            }
            .es-m-p40t {
                padding-top: 40px!important;
            }
            .es-m-p40b {
                padding-bottom: 40px!important;
            }
            .es-m-p40r {
                padding-right: 40px!important;
            }
            .es-m-p40l {
                padding-left: 40px!important;
            }
        }

        @media screen and (max-width:384px) {
            .mail-message-content {
                width: 414px!important;
            }
        }
    </style>
</head>
<body style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;background-color:var(--bg-color);color:var(--text-color)">
<div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:var(--bg-color)"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#f6f6f6"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:var(--bg-color)">
        <tr>
            <td valign="top" style="padding:0;Margin:0">
                <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                    <tr>
                        <td align="center" style="padding:0;Margin:0">
                            <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="var(--bg-color)" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:var(--bg-color);width:600px">
                                <tr>
                                    <td align="left" style="padding:0;Margin:0;background-color:var(--bg-color)">
                                        <table cellspacing="0" cellpadding="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                            <tr>
                                                <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://eifdhct.stripocdn.email/content/guids/CABINET_f5639600b528ded98b5840b126401cb2330008b5c785cddf808809c425ae3cef/images/group_34916.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="52"></td>
                                                        </tr>
                                                    </table></td>
                                            </tr>
                                        </table></td>
                                </tr>
                            </table></td>
                    </tr>
                </table>
                <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                    <tr>
                        <td align="center" style="padding:0;Margin:0">
                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="var(--bg-color)" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:var(--bg-color);width:600px" role="none">
                                <tr>
                                    <td align="left" style="padding:0;Margin:0">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                            <tr>
                                                <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;position:relative"><img class="adapt-img" src="https://eifdhct.stripocdn.email/content/guids/bannerImgGuid/images/image17133703928803463.png" alt title width="560" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="211"></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:10px;padding-bottom:30px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:var(--text-color);font-size:16px">Dear ${data.name},</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:var(--text-color);font-size:16px">&nbsp;Thank you for registering with Templeton!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:var(--text-color);font-size:16px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:var(--text-color);font-size:16px">&nbsp;To complete your registration, please verify your email address by clicking the link below:&nbsp;</p></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;padding-bottom:20px"><!--[if mso]><a href="${data.link}" target="_blank" hidden>
                                                                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="${data.link}"
                                                                             style="height:39px; v-text-anchor:middle; width:154px" arcsize="0%" stroke="f"  fillcolor="#1d77ff">
                                                                    <w:anchorlock></w:anchorlock>
                                                                    <center style='color:var(--button-text-color); font-family:lato, "helvetica neue", helvetica, arial, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px'>Verify now</center>
                                                                </v:roundrect></a>
                                                                <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:var(--button-bg-color);background:var(--button-bg-color);border-width:0px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a href="${data.link}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:var(--button-text-color);font-size:16px;display:inline-block;background:var(--button-bg-color);border-radius:0px;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;padding:10px 30px 10px 30px;mso-padding-alt:0;mso-border-alt:10px solid var(--button-bg-color)">Verify now</a></span><!--<![endif]--></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="es-m-p0r es-m-p0l" style="padding:0;Margin:0;padding-bottom:30px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:var(--text-color);font-size:16px">If you did not create an account on our platform, you can ignore this email.</p></td>
                                                        </tr>
                                                    </table></td>
                                            </tr>
                                        </table></td>
                                </tr>
                            </table></td>
                    </tr>
                </table>
                <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                    <tr>
                        <td align="center" style="padding:0;Margin:0">
                            <table bgcolor="var(--bg-color)" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:var(--bg-color);width:600px" role="none">
                                <tr>
                                    <td class="es-m-p0r" align="left" style="padding:0;Margin:0;padding-right:20px;background-color:var(--bg-color)"><!--[if mso]><table dir="ltr" cellpadding="0" cellspacing="0"><tr><td><table dir="rtl" style="width:580px" cellpadding="0" cellspacing="0"><tr><td dir="ltr" style="width:290px" valign="top"><![endif]-->
                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                            <tr>
                                                <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:290px">
                                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="left" class="es-m-txt-c es-m-p20r es-m-p20l" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:var(--text-color);font-size:16px">&nbsp;If you have any questions or need assistance, please contact our support team at [<a target="_blank" href="mailto:yana@digiway.dev" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:var(--link-color);font-size:16px">yana@digiway.dev</a>].&nbsp;</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:var(--text-color);font-size:20px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:var(--text-color);font-size:20px">Best regards,</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:var(--text-color);font-size:20px">The TEMLETON Team</p></td>
                                                        </tr>
                                                    </table></td>
                                            </tr>
                                        </table><!--[if mso]></td><td dir="ltr" style="width:20px"></td><td dir="ltr" style="width:270px" valign="top"><![endif]-->
                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                            <tr>
                                                <td align="left" style="padding:0;Margin:0;width:270px">
                                                    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:var(--bg-color)" bgcolor="var(--bg-color)" role="presentation">
                                                        <tr class="es-mobile-hidden">
                                                            <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://digiwaysite.tech" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:var(--link-color);font-size:20px"><img class="adapt-img" src="https://eifdhct.stripocdn.email/content/guids/CABINET_f5639600b528ded98b5840b126401cb2330008b5c785cddf808809c425ae3cef/images/group_34917_1_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="270" height="193"></a></td>
                                                        </tr>
                                                    </table></td>
                                            </tr>
                                        </table><!--[if mso]></td></tr></table></td></tr></table><![endif]--></td>
                                </tr>
                            </table></td>
                    </tr>
                </table>
                <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                    <tr>
                        <td align="center" style="padding:0;Margin:0">
                            <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="var(--bg-color)" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:var(--bg-color);width:600px" role="none">
                                <tr>
                                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                        <table cellspacing="0" cellpadding="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                            <tr>
                                                <td align="left" style="padding:0;Margin:0;width:560px">
                                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:var(--text-color);font-size:14px">Copyright © 2024 Temleton, All rights reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:var(--text-color);font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:var(--text-color);font-size:14px"><a target="_blank" href="https://digiwaysite.tech/terms-conditions/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:var(--link-color);font-size:14px">Terms of Service </a>| <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:var(--link-color);font-size:14px" href="https://digiwaysite.tech/privacy-policy/">Privacy Policy</a></p></td>
                                                        </tr>
                                                    </table></td>
                                            </tr>
                                        </table></td>
                                </tr>
                            </table></td>
                    </tr>
                </table></td>
        </tr>
    </table>
</div>
</body>
</html>

    `
};