import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from 'reactflow';
import { motion } from 'framer-motion';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1. Identifying Adhesions' }, type: 'input', style: { background: '#DBEAFE', borderColor: '#3B82F6' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2. Instrument Application' }, style: { background: '#EDE9FE', borderColor: '#7C3AED' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: '3. Promoting Healing' }, type: 'output', style: { background: '#D1FAE5', borderColor: '#10B981' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

const DeeperDiveSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What is Graston Technique®?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            A deeper look into the innovative, evidence-based form of instrument-assisted soft tissue mobilization.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="prose max-w-none"
          >
            <p>
              Graston Technique® (GT) is a therapeutic method for diagnosing and treating soft tissue injuries. It involves using six patented stainless steel instruments of various shapes and sizes to detect and break down scar tissue and fascial restrictions in the body.
            </p>
            <p>
              When tissue is injured, it can heal in a haphazard way, forming scar tissue or adhesions. These can lead to pain and restricted movement. GT instruments are designed to comb over the tissue, resonating to find these problematic areas. Once located, the instruments are used to break up the fibrotic tissue, helping the body to absorb it and promote the healing of healthy tissue.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="h-80 w-full rounded-lg border shadow-sm"
          >
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              fitView
              nodesDraggable={false}
              nodesConnectable={false}
              zoomOnScroll={false}
              panOnDrag={false}
            >
              <Controls showInteractive={false} />
              <MiniMap />
              <Background gap={12} size={1} />
            </ReactFlow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeeperDiveSection;