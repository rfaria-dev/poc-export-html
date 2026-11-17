import { useState } from "react";
import { Stack, Typography, Button, ButtonGroup } from "@mui/material";
import { ColumnChart } from "../components/column-chat/column-chart";

const chartData = {
  vendas: {
    categories: ["Janeiro", "Fevereiro", "Março", "Abril"],
    data: [20, 45, 30, 60],
  },
  despesas: {
    categories: ["Janeiro", "Fevereiro", "Março", "Abril"],
    data: [15, 25, 20, 40],
  },
  usuarios: {
    categories: ["Janeiro", "Fevereiro", "Março", "Abril"],
    data: [50, 80, 65, 100],
  },
};

type ChartType = keyof typeof chartData;

export const Export = () => {
  const [selectedChart, setSelectedChart] = useState<ChartType>("vendas");
  const [downloading, setDownloading] = useState(false);

  const currentData = chartData[selectedChart];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch("/export.html");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "export.html";
      anchor.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      alert(
        'O arquivo único ainda não foi gerado. Rode "npm run build" e tente novamente.'
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Stack sx={{ border: "solid white 1px", p: 3, gap: 3 }}>
      <Typography variant="h5">Export Page</Typography>

      <ButtonGroup variant="outlined" sx={{ gap: "1rem" }}>
        <Button
          variant={selectedChart === "vendas" ? "contained" : "outlined"}
          onClick={() => setSelectedChart("vendas")}
        >
          Vendas
        </Button>

        <Button
          variant={selectedChart === "despesas" ? "contained" : "outlined"}
          onClick={() => setSelectedChart("despesas")}
        >
          Despesas
        </Button>

        <Button
          variant={selectedChart === "usuarios" ? "contained" : "outlined"}
          onClick={() => setSelectedChart("usuarios")}
        >
          Usuários
        </Button>
      </ButtonGroup>

      <ColumnChart
        categories={currentData.categories}
        data={currentData.data}
      />

      <Button variant="contained" onClick={handleDownload} disabled={downloading}>
        {downloading ? "Baixando..." : "Baixar HTML único"}
      </Button>
    </Stack>
  );
};
