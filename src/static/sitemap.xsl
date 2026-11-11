<?xml version="1.0" encoding="UTF-8"?>
<!-- 让浏览器里直接打开的 sitemap 可读；搜索引擎会忽略这份样式。 -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>XML sitemap</title>
        <style>
          body { margin: 0; padding: 32px 20px; background: #e9e9e4; color: #17181a; font: 15px/1.5 system-ui, sans-serif; }
          main { max-width: 1080px; margin: 0 auto; }
          h1 { margin: 0 0 6px; font-size: 26px; }
          p { margin: 0 0 22px; color: #5c5f64; }
          table { width: 100%; border-collapse: collapse; background: #f7f7f3; border: 1px solid #c9c9c1; }
          th, td { padding: 9px 14px; border-bottom: 1px solid #c9c9c1; text-align: left; vertical-align: top; }
          th { border-bottom-color: #17181a; font-size: 13px; }
          td { font-variant-numeric: tabular-nums; }
          td:first-child { word-break: break-all; }
          a { color: inherit; }
        </style>
      </head>
      <body>
        <main>
          <h1>XML sitemap</h1>
          <xsl:choose>
            <xsl:when test="sm:sitemapindex">
              <p>This index lists <xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/> sitemap files.</p>
              <table>
                <tr><th>Sitemap</th><th>Last modified</th></tr>
                <xsl:for-each select="sm:sitemapindex/sm:sitemap">
                  <tr>
                    <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                    <td><xsl:value-of select="sm:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:when>
            <xsl:otherwise>
              <p>This file lists <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs.</p>
              <table>
                <tr><th>URL</th><th>Languages</th><th>Last modified</th></tr>
                <xsl:for-each select="sm:urlset/sm:url">
                  <tr>
                    <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                    <td>
                      <xsl:for-each select="xhtml:link">
                        <xsl:value-of select="@hreflang"/>
                        <xsl:if test="position() != last()">, </xsl:if>
                      </xsl:for-each>
                    </td>
                    <td><xsl:value-of select="sm:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
