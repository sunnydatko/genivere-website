"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { experience, education } from "../helpers/config";

export default function Experience() {
  return (
    <Box
      component="section"
      id="experience"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container sx={{ maxWidth: "880px !important" }}>
        {/* Section header */}
        <Box className="reveal" sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              color: "secondary.light",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 600,
              fontSize: { xs: 12.5, md: 14 },
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            + Career
          </Typography>
          <Typography variant="h3">Experience</Typography>
        </Box>

        {/* Work timeline */}
        {experience.map((company, index) => (
          <Box
            key={company.company}
            className="reveal"
            style={{ transitionDelay: `${index * 0.1 + 0.1}s` }}
            sx={{
              position: "relative",
              pl: { xs: 2.5, md: 4 },
              py: 1,
              mb: 5,
              borderLeft: "2px solid",
              borderColor: "rgba(200,160,80,0.40)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "22px", md: "28px" } }}
            >
              <Link
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "common.white" }}
              >
                {company.company}
              </Link>
            </Typography>

            <Typography
              sx={{
                color: "grey.100",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 600,
                fontSize: { xs: 15, md: 17 },
                mt: 1.5,
              }}
            >
              {company.title}
            </Typography>

            <Typography
              sx={{
                color: "grey.400",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: { xs: 13, md: 14 },
                letterSpacing: "0.04em",
                mt: 0.5,
                mb: 1,
              }}
            >
              {company.dates}
            </Typography>

            <Typography
              sx={{
                color: "grey.300",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: { xs: 15, md: 16 },
                lineHeight: 1.65,
              }}
            >
              {company.points[0]}
            </Typography>
          </Box>
        ))}

        {/* Education sub-header */}
        <Box className="reveal" sx={{ textAlign: "center", mb: 6, mt: 4 }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              color: "secondary.light",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 600,
              fontSize: { xs: 12.5, md: 14 },
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            + Education
          </Typography>
          <Typography variant="h3">Academics</Typography>
        </Box>

        {/* Education entries */}
        {education.map((entry, index) => (
          <Box
            key={entry.company}
            className="reveal"
            style={{ transitionDelay: `${index * 0.1 + 0.1}s` }}
            sx={{
              position: "relative",
              pl: { xs: 2.5, md: 4 },
              py: 1,
              mb: 5,
              borderLeft: "2px solid",
              borderColor: "rgba(200,160,80,0.40)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "22px", md: "28px" } }}
            >
              {"url" in entry && entry.url ? (
                <Link
                  href={entry.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "common.white" }}
                >
                  {entry.company}
                </Link>
              ) : (
                entry.company
              )}
            </Typography>

            <Typography
              sx={{
                color: "grey.400",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: { xs: 13, md: 14 },
                letterSpacing: "0.04em",
                mt: 1,
                mb: 1.5,
              }}
            >
              {entry.dates}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {entry.experience.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    color: "grey.300",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: { xs: 15, md: 16 },
                    lineHeight: 1.65,
                    "&:first-of-type": {
                      fontWeight: 600,
                      color: "grey.100",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
